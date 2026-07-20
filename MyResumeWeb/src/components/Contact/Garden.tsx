import { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Spinner, Placeholder } from 'react-bootstrap';
import '../../styles/Garden.css';
import ActivityStatus from './ActivityStatus';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import type { ActivityStatusProp } from '../../types/ActivityStatusProp';

interface GardenEntry {
  name: string;
  notes: string;
  imageUrl: string;
  date: string;
}

const GARDEN_URL = 'https://raw.githubusercontent.com/Lacketronik/Digital-Garden/main/public/digital_garden.json';

export default function DigitalGarden({ activityStatus, isLoading, hasError }: { activityStatus: ActivityStatusProp[]; isLoading: boolean; hasError: boolean }) {
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
            <p className="fw-bold garden-title">WHAT'S GOIN ON IN MY NOGGIN...</p>
            <p className="garden-summary text-muted">A scrollable timeline of thoughts and experiments.</p>
          </div>

          <div className="garden-placeholder-copyBlock mt-3">
            {isLoading && (
              <div className="d-flex flex-column gap-2 text-muted small">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Spinner animation="border" size="sm" variant="secondary" />
                  <span className="text-italic text-opacity-75">Waking server (cold start)...</span>
                </div>
                <div className="placeholder-glow">
                  <Placeholder xs={5} className="bg-secondary rounded mb-1" style={{ height: '14px' }} /><br />
                  <Placeholder xs={8} className="bg-secondary opacity-50 rounded" style={{ height: '12px' }} />
                </div>
                <div className="placeholder-glow mt-2">
                  <Placeholder xs={4} className="bg-secondary rounded mb-1" style={{ height: '14px' }} /><br />
                  <Placeholder xs={6} className="bg-secondary opacity-50 rounded" style={{ height: '12px' }} />
                </div>
              </div>
            )}

            {!isLoading && hasError && (
              <p className="garden-summary text-warning small text-italic">
                Live stats temporarily offline.
              </p>
            )}

            {!isLoading && !hasError && activityStatus.length > 0 && (
              <ActivityStatus ActivityStatusProps={activityStatus} />
            )}
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