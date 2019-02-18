FROM node:8 as builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM python:3.6.4
WORKDIR /pyapp
COPY --from=builder /usr/src/app .
RUN pip install -r requirements.txt
EXPOSE ${APP_PORT}
CMD python app.py
