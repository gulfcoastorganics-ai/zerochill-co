# Deployment Topology

ZeroChill Co deployment topology is built around segmented local execution with narrow relay paths.

## Topology

- Local node cluster for primary workloads
- Offline inference nodes for deterministic local processing
- Relay topology for updates and governance handoffs
- Tactical workstation for operator review and command entry
- Secure edge compute for hardened perimeter placements

## Example Flow

1. Operator submits a task from the workstation.
2. The local node handles policy and inference.
3. Relay systems move only approved artifacts.
4. Edge layers remain isolated unless explicitly connected.

## Notes

- This model reduces dependency on external uptime.
- This model is suited to private labs, field systems, and restricted environments.
- This model should be documented before backend integrations are added.

