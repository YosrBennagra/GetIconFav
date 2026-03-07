# Dockerfile Checklist

## Build Review

- Is a multi-stage build appropriate?
- Are heavy dependency steps cache-friendly?
- Is build context kept small?

## Runtime Review

- Does the final image contain only required artifacts?
- Does the container run as non-root?
- Are exposed ports and runtime files intentional?

## Security Review

- Could secrets leak into layers or history?
- Is the base image choice justified?
- Is the final image smaller and less privileged than the build image?
