#!/bin/bash

# Root files
touch README.md LICENSE .gitignore docker-compose.yml

# Frontend
mkdir -p frontend/public frontend/src
touch frontend/package.json frontend/Dockerfile frontend/README.md

# Services
mkdir -p services/{signaling,matchmaking,chat,identity}/{src,tests,config}
touch services/signaling/{Dockerfile,README.md}
touch services/matchmaking/{Dockerfile,README.md}
touch services/chat/{Dockerfile,README.md}
touch services/identity/{Dockerfile,README.md}

# Infra
mkdir -p infra/{ansible,terraform,k8s/scripts,docker}

# Ansible
mkdir -p infra/ansible/{inventory,playbooks,roles}
touch infra/ansible/README.md
touch infra/ansible/inventory/{dev.ini,prod.ini}
touch infra/ansible/playbooks/local-setup.yml

# Terraform
mkdir -p infra/terraform/modules/{vpc,ecs,dynamodb,cloudfront,api-gateway,iam}
touch infra/terraform/{main.tf,variables.tf,outputs.tf,README.md}

# Kubernetes
mkdir -p infra/k8s/{base,overlays}
touch infra/k8s/README.md

# Scripts
touch infra/scripts/{init.sh,deploy.sh,destroy.sh}

# Docker base images
touch infra/docker/{node-base.Dockerfile,python-base.Dockerfile}

# Monitoring
mkdir -p monitoring/{prometheus,grafana/dashboards,alertmanager}
touch monitoring/prometheus/prometheus.yml
touch monitoring/grafana/dashboards/.gitkeep
touch monitoring/alertmanager/alertmanager.yml
touch monitoring/README.md

# Docs
mkdir -p docs/{architecture,sequence-flows,sre}
touch docs/system-design.md
touch docs/scaling-strategy.md
touch docs/security.md
touch docs/deployment-guide.md
touch docs/sre/{slos.md,slis.md,error-budgets.md}
touch docs/architecture/.gitkeep docs/sequence-flows/.gitkeep

# CI
mkdir -p ci/github/workflows
touch ci/github/workflows/{build.yml,deploy.yml,lint-test.yml}
touch ci/README.md

echo "MeetGrid project structure created successfully!"