# 🩸 Blood Donor Finder on AWS

A full-stack **Node.js Blood Donor Finder** application deployed on **Amazon Web Services (AWS)** using **EC2** and **Amazon RDS (MySQL)**.

The application allows users to:

- Register as a blood donor
- Search donors by blood group and city
- Store donor information securely in an Amazon RDS MySQL database

---

## 📌 Project Overview

This project demonstrates how to deploy a complete Node.js web application on AWS without using advanced infrastructure such as VPC customization, Auto Scaling Groups, or Load Balancers.

### Architecture

```
               Internet
                    │
                    ▼
          +------------------+
          |    Amazon EC2    |
          |  Node.js + EJS   |
          +------------------+
                    │
          MySQL Connection
                    │
                    ▼
          +------------------+
          |   Amazon RDS     |
          |      MySQL       |
          +------------------+
```

---

# 🚀 AWS Services Used

- Amazon EC2
- Amazon RDS (MySQL)
- Security Groups
- Amazon Linux 2023
- Node.js
- Express.js
- EJS
- MySQL2

---

# 📂 Project Structure

```
blood-finder/
│
├── app.js
├── package.json
├── package-lock.json
│
├── views/
│   ├── index.ejs
│   └── results.ejs
│
└── README.md
```

---

# Features

- Register blood donors
- Search donors by blood group
- Search donors by city
- Responsive user interface using EJS
- Stores data in Amazon RDS MySQL
- Simple AWS deployment using EC2

---

# Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| MySQL2 | Database Driver |
| Amazon RDS | MySQL Database |
| Amazon EC2 | Application Hosting |
| EJS | Templating Engine |
| Body Parser | Form Handling |

---

# Step 1 – Create Amazon RDS Database

Create a new MySQL database.

### Configuration

| Setting | Value |
|----------|------|
| Engine | MySQL |
| Template | Free Tier |
| DB Identifier | blood-db |
| Username | admin |
| Password | Your Password |
| Instance | db.t3.micro |
| Initial Database | blooddb |
| Public Access | Yes |

After creation, copy the **RDS Endpoint**.

Example:

```
blood-db.xxxxx.ap-south-1.rds.amazonaws.com
```

---

# Step 2 – Launch Amazon EC2

Launch an Amazon Linux 2023 instance.

### Configuration

| Setting | Value |
|----------|------|
| Name | blood-server |
| Instance | t3.micro |
| AMI | Amazon Linux 2023 |
| Key Pair | blood-key |

Allow:

- SSH (22)
- HTTP (80)
- Custom TCP (3000)

---

# Step 3 – Configure Security Groups

Allow MySQL access.

RDS Security Group

```
Port : 3306
Source : 0.0.0.0/0
```

> **Note**
>
> This is only for learning purposes.
> Never expose your database publicly in production.

---

# Step 4 – Connect to EC2

Using PuTTY

```
Host:

ec2-user@<EC2_PUBLIC_IP>
```

Attach

```
blood-key.ppk
```

Login

```
ec2-user
```

---

# Step 5 – Install Required Packages

Update system

```bash
sudo dnf update -y
```

Install Node.js, Git and MySQL Client

```bash
sudo dnf install -y nodejs git mariadb105
```

Verify installation

```bash
node --version

npm --version

mysql --version
```

---

# Step 6 – Create Database Table

Connect to RDS

```bash
mysql -h <RDS_ENDPOINT> -u admin -p
```

Select database

```sql
USE blooddb;
```

Create table

```sql
CREATE TABLE donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    blood_group VARCHAR(5),
    city VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Verify

```sql
SHOW TABLES;

DESCRIBE donors;
```

Exit

```sql
EXIT;
```

---

# Step 7 – Create Node.js Application

Create project

```bash
mkdir blood-finder

cd blood-finder
```

Initialize npm

```bash
npm init -y
```

Install dependencies

```bash
npm install express mysql2 ejs body-parser
```

Create folders

```bash
mkdir views
```

Create

```
app.js
```

Create

```
views/index.ejs
```

Create

```
views/results.ejs
```

---

# Database Configuration

Update your RDS endpoint inside **app.js**

```javascript
const pool = mysql.createPool({
    host: 'YOUR_RDS_ENDPOINT',
    user: 'admin',
    password: 'YOUR_PASSWORD',
    database: 'blooddb',
    waitForConnections: true,
    connectionLimit: 10,
});
```

> **Important:** Never commit passwords or database credentials to GitHub. Use environment variables (`.env`) in production.

---

# Step 8 – Run the Application

```bash
node app.js
```

Output

```
Blood Finder running on port 3000
```

---

# Step 9 – Access the Application

Open

```
http://<EC2_PUBLIC_IP>:3000
```

Example

```
http://54.xxx.xxx.xxx:3000
```

---

# Testing

### Register a donor

```
Name : Rahul

Blood Group : O+

City : Delhi

Phone : 9876543210
```

Click **Register**

---

### Search donor

```
Blood Group : O+

City : Delhi
```

Click **Search**

Expected Result

```
Rahul

Blood Group : O+

City : Delhi

Phone : 9876543210
```

---

# Application Screens

Add screenshots here.

```
screenshots/
│
├── home.png
├── register.png
├── search.png
└── results.png
```

Example

```markdown
![Home](screenshots/home.png)

![Results](screenshots/results.png)
```

---

# Future Improvements

- User Authentication
- JWT Authentication
- REST API
- Docker Support
- HTTPS using SSL
- Route53 Domain
- Elastic Beanstalk Deployment
- CI/CD using GitHub Actions
- Auto Scaling
- Application Load Balancer
- Private RDS
- Environment Variables (.env)
- CloudWatch Monitoring

---

# Learning Outcomes

This project helps understand:

- Deploying Node.js applications on AWS EC2
- Creating Amazon RDS MySQL databases
- Configuring Security Groups
- Connecting Node.js to MySQL
- Building CRUD applications
- Hosting web applications on AWS
- AWS networking basics

---

# Security Note

This project is intended for educational purposes.

The following settings should **NOT** be used in production:

- Public RDS
- Hardcoded database passwords
- Open MySQL port (3306)
- HTTP instead of HTTPS

Always use:

- IAM Roles
- Secrets Manager
- AWS Systems Manager Parameter Store
- Environment Variables
- Private Subnets
- SSL/TLS

---

# Author

**Ankit**

AWS | Cloud Computing | Node.js | DevOps Enthusiast

---

# License

This project is licensed under the MIT License.

---

## ⭐ If you found this project helpful, don't forget to star the repository!
```
