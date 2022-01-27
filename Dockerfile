FROM docker.elastic.co/beats/heartbeat:7.16.3

ENV ELASTIC_SYNTHETICS_OFFLINE=true

COPY ./journey/ /journey/
USER root
RUN chmod -R 777 /journey
USER heartbeat

RUN cd /journey && npm install
