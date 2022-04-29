FROM jsii/superchain

WORKDIR /app

ARG BUILD_ARGS

COPY . .

RUN yarn install && yarn build ${BUILD_ARGS} 

