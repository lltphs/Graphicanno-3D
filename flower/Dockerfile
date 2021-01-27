FROM mher/flower:0.9.5

ENTRYPOINT []

USER root 

COPY ./wait-for .
RUN mv wait-for /bin/wait-for
RUN ["chmod", "+x", "/bin/wait-for"]

USER flower
