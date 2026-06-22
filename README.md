# MyResume: A Cloud-Native Evolution Journey

**MyResume** is an applied learning project designed to showcase the architectural evolution of a modern application-transitioning from traditional virtualized infrastructure to a fully optimised, serverless cloud ecosystem.

This repository tracks the transformation of a personal portfolio site across four distinct architectural phases, demonstrating expertise in cloud migration, Infrastructure as Code (IaC), and modern DevOps practices.

---

## Project Overview

The core objective of this project is to move beyond "ClickOps" and embrace automation, scalability, and cost-efficiency. Each phase represents a significant shift in how resources are managed, secured, and deployed.

| Phase | Architecture | Infrastructure Approach |
| :--- | :--- | :--- |
| **Phase 1** | Traditional Virtualized Stack | Manual Configuration ("ClickOps") |
| **Phase 2** | Virtualized Stack | Infrastructure as Code (Terraform) |
| **Phase 3** | Serverless Architecture | Manual Setup |
| **Phase 4** | Serverless Architecture | Fully Automated (Terraform + CI/CD) |

---

## Technical Stack

* **Frontend:** React, TypeScript, Azure Static Web App (Phases 3-4)
* **Backend:** C# .NET Core WebAPI (Phases 1-2), Azure Functions (Phase 3)
* **Database:** SQL (Phases 1-2), Azure Cosmos DB NoSQL (Phase 3)
* **Infrastructure:** Terraform
* **Cloud Provider:** Microsoft Azure
* **DevOps:** GitHub Actions (CI/CD)

---

## Architectural Phases

### Phase 1: Foundations
* **Focus:** Initial application development.
* **Methodology:** Built using a traditional stack. Infrastructure was provisioned via manual configuration in the Azure Portal to establish a baseline.

### Phase 2: Embracing IaC
* **Focus:** Reproducibility and version control.
* **Methodology:** Migrated the entire Phase 1 stack to **Terraform** configuration files, treating infrastructure as software and enabling consistent, repeatable deployments.

### Phase 3: The Serverless Leap
* **Focus:** Moving from traditional virtualised infrastructure to serverless.
* **Methodology:** Refactored the monolithic backend into **Azure Functions** and migrated data to **Azure Cosmos DB**. The frontend was transitioned to **Azure Static Web Apps** for improved global delivery.

### Phase 4: Full Automation & Optimisation
* **Focus:** Establishing CI/CD with automated testing.
* **Methodology:** Deployed the serverless architecture using **Terraform**. Implemented robust **CI/CD pipelines** using GitHub Actions, integrating automated testing and performance tuning to optimise for speed and cost.

---

## Key Learnings

* **Infrastructure as Code (IaC):** Transitioning from manual "ClickOps" to Terraform-managed infrastructure significantly reduced environment drift and human error, enabling consistent and repeatable deployments.
* **Serverless Architecture:** By refactoring to Azure Functions and Cosmos DB, I eliminated the management overhead of virtual machines, leveraging event-driven, scalable compute that is highly cost-effective.
* **Modern DevOps Workflow:** Implementing GitHub Actions CI/CD pipelines taught me how to automate the build, test, and deployment lifecycle, ensuring rapid delivery with high confidence via automated testing.
* **Cloud-Native Optimization:** Learned how to balance performance and cost by moving to serverless hosting, which provides global delivery and lower latency compared to traditional virtualized stacks.

---

## Project Playlist
* **Playlist:** [https://www.youtube.com/playlist?list=PLnVOBIP2EzKACb19qYpuVlLwz6iGDsFmW]

---

## Author

**Faliq**  

* **LinkedIn:** [https://linkedin.com/in/m-faliq-b-alhakim/]
* **Portfolio:** [https://faliqdoescoding.com]
* **GitHub:** [https://github.com/Lacketronik]
