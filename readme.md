A minimal example to reproduce the airgap issue.

Run your own elatic or use the provided compose file:

```
docker-compose up -d
```

Works just fine:

```
docker run --rm -it --network airgapped_el_test -v $pwd/journey:/journey -v $pwd/heartbeat.yml:/usr/share/heartbeat/heartbeat.yml docker.elastic.co/beats/heartbeat:7.16.3 heartbeat -e --strict.perms=false
```

Works too:

```
docker run --rm -it --network airgapped_el_test -v $pwd/journey:/journey docker.elastic.co/beats/heartbeat:7.16.3 bash -c "cd /journey && rm -rf node_modules && npm install && npx @elastic/synthetics . && rm -rf node_modules package-lock.json .synthetics"
```

Then we try to run in airgapped mode with all dependencies present:

```
docker run --rm -it --network airgapped_el_test -v $pwd/journey:/journey -v $pwd/heartbeat.yml:/usr/share/heartbeat/heartbeat.yml -e ELASTIC_SYNTHETICS_OFFLINE=true docker.elastic.co/beats/heartbeat:7.16.3 heartbeat -e --strict.perms=false
```

Doesn't work because:

```
could not fetch for suite job: could not copy suite: symlink ../acorn/bin/acorn /tmp/elastic-synthetics-3785992817/node_modules/.bin/acorn: operation not permitted
```

Maybe building the container would help? This works:

```
docker build -t my-custom-heartbeat .
docker run --rm -it my-custom-heartbeat bash -c "cd /journey && npx @elastic/synthetics ."
```

This doesn't:
```
docker run --rm -it --network airgapped_el_test -v $pwd/heartbeat.yml:/usr/share/heartbeat/heartbeat.yml my-custom-heartbeat heartbeat -e --strict.perms=false
```

Same issue, trying to overwrite existing files.

---

2nd issue:

```
docker build -f .\Dockerfile2 --no-cache -t my-custom-heartbeat .

docker run --rm -it --network airgapped_el_test -v $pwd/heartbeat.yml:/usr/share/heartbeat/heartbeat.yml my-custom-heartbeat heartbeat -e --strict.perms=false
```

Doesn't work either:

```
"error": {
    "type": "io",
    "message": "fork/exec /tmp/elastic-synthetics-667638448/node_modules/.bin/elastic-synthetics: no such file or directory"
  },
```

