import { useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../styles/Garden.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface GardenEntry {
  name: string;
  notes: string;
  imageUrl: string;
  date: string;
}

const GARDEN_URL = 'https://raw.githubusercontent.com/Lacketronik/Digital-Garden/main/public/digital_garden.json';

export default function DigitalGarden() {
  const [items, setItems] = useState<GardenEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<GardenEntry | null>(null);

  useEffect(() => {
    const fetchGarden = async () => {
      try {
        const gardenUrl = new URL(GARDEN_URL);
        gardenUrl.searchParams.set('cachebust', Date.now().toString());

        const res = await fetch(gardenUrl.toString(), { cache: 'no-store' });
        const data: GardenEntry[] = await res.json();
        const sortedItems = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setItems(sortedItems);
        setError(null);
      } catch (err) {
        console.error('Garden fetch error:', err);
        setError('Unable to load your garden right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchGarden();
  }, []);

  const feedItems = useMemo(() => {
    return [...items]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((item, index) => ({
        ...item,
        key: `${item.date}-${item.name}-${index}`,
        formattedDate: new Date(item.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }),
      }));
  }, [items]);

  if (loading) {
    return (
      <div className="garden-shell garden-shell--loading">
        <div className="garden-loading">Cultivating the garden...</div>
      </div>
    );
  }

  return (
    <section className="garden-shell" aria-label="Digital garden feed">
      <div className="garden-layout">
        <aside className="garden-placeholder" aria-label="Garden sidebar placeholder">
          <div className="garden-placeholder-intro">
            <p className="garden-title">WHAT'S GOIN ON IN MY NOGGIN...</p>
            <p className="garden-summary">A scrollable timeline of thoughts, images and experiments.</p>
          </div>

          <div className="garden-placeholder-copyBlock">
            <p className="garden-title">CURRENT FOCUS</p>
            <p className="garden-summary">Experimenting with side projects</p>
            <p className="garden-title">STATUS</p>
            <p className="garden-summary">Open to Work / Collaboration</p>
          </div>
        </aside>

        <div className="garden-feed" role="feed" aria-busy={loading}>
          {error ? (
            <div className="garden-empty garden-empty--error">{error}</div>
          ) : feedItems.length === 0 ? (
            <div className="garden-empty">No posts yet. Check back soon.</div>
          ) : (
            <VerticalTimeline layout="1-column" lineColor="#ff9900" animate={true}>
              {feedItems.map((item) => (
                <VerticalTimelineElement
                  key={item.key}
                  className="vertical-timeline-element--garden"
                  contentStyle={{ background: 'rgba(27, 36, 55, 0.725)', borderRadius: '0.75rem', color: '#fff', boxShadow: '0 0 0 0px' }}
                  contentArrowStyle={{ borderRight: '7px solid rgba(27, 36, 55, 0.725)' }}
                  date={item.formattedDate}
                  iconStyle={{ background: '#ff9900', color: '#fff', boxShadow: '0 0 0 3px #ff9900' }}
                >
                  <p className="garden-post-notes" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                    {item.notes}
                  </p>
                  {item.imageUrl && item.imageUrl !== 'undefined' && (
                    <button
                      type="button"
                      className="garden-post-imageButton"
                      onClick={() => setActiveImage(item)}
                      aria-label={`Open full size image for ${item.name}`}
                    >
                      <img className="garden-post-image" src={item.imageUrl} alt={item.name} loading="lazy" />
                    </button>
                  )}
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          )}
        </div>
      </div>

      <Modal
        show={activeImage !== null}
        onHide={() => setActiveImage(null)}
        centered
        size="xl"
        contentClassName="garden-image-modal-content"
        dialogClassName="garden-image-modal-dialog"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{activeImage?.notes}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="garden-image-modal-body">
          {activeImage && (
            <img className="garden-image-modal-image" src={activeImage.imageUrl} alt={activeImage.name} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setActiveImage(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </section>
  );
}