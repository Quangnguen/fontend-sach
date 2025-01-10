# Sử dụng Node.js làm base image
FROM node:14

# Thiết lập thư mục làm việc trong container
WORKDIR /.

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch ứng dụng React
RUN npm run build

# Cung cấp cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]