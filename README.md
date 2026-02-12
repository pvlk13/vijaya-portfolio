
[Hosting.md](https://github.com/user-attachments/files/25267262/Hosting.md)
# Hosting Static Website in Cloud:

**Creating a S3 bucket:**

![image.png](images/image.png)

![image.png](images/image1.png)

![image.png](images/image2.png)

You can upload any file type—images, backups, data, movies, and so on—into an S3 bucket. The maximum size of a file that you can upload by using the Amazon S3 console is 160 GB. To upload a file larger than 160 GB, use the AWS Command Line Interface (AWS CLI), AWS SDKs, or Amazon S3 REST API.

To upload files greater than 5 TB, use the S3 Transfer Manager in the Java v1/v2, Python, or AWS CLI SDKs. For the best performance, use the latest AWS Common Runtime (CRT) with these SDKs, which has been optimized for better resource utilization.

When you upload an object, the object is automatically encrypted using server-side encryption with Amazon S3 managed keys (SSE-S3) by default

**Upload Website Files**

![image.png](images/image3.png)

![image.png](images/image4.png)

![image.png](images/image5.png)

 **CloudFront**

Amazon CloudFront is a web service that speeds up distribution of your static and dynamic web content, such as .html, .css, .js, and image files, to your users. CloudFront delivers your content through a worldwide network of data centers called edge locations.

When a user requests content that you're serving with CloudFront, the request is routed to the edge location that provides the lowest latency (time delay), so that content is delivered with the best possible performance

When a user requests content that you're serving with CloudFront, the request is routed to the edge location that provides the lowest latency (time delay), so that content is delivered with the best possible performance

**How you set up CloudFront to deliver content**

You create a CloudFront distribution to tell CloudFront where you want content to be delivered from, and the details about how to track and manage content delivery.

Then CloudFront uses computers—edge servers—that are close to your viewers to deliver that content quickly when someone wants to see it or use it.

![image.png](images/image6.png)

The [Set up your AWS account](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/setting-up-cloudfront.html) topic describes prerequisites for the following tutorials, such as creating an AWS account and creating a user with administrative access.

The secure static website tutorial shows you how to create a secure static website for your domain name using OAC with an Amazon S3 origin. The tutorial uses an Amazon CloudFront (CloudFront) template for configuration and deployment

• **Is secured by HTTPS and security headers** – This solution creates an SSL/TLS certificate in [AWS Certificate Manager (ACM)](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html), and attaches it to the CloudFront distribution. This certificate enables the distribution to serve your domain’s website securely with HTTPS.

• **Is configured and deployed with [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)** – This solution uses an CloudFormation template to set up all the components, so you can focus more on your website’s content and less on configuring components.

## **Deploy the solution**

To deploy this secure static website solution, you can choose from either of the following options:

- Use the CloudFormation console to deploy the solution with default content, then upload your website content to Amazon S3.

Go to Route 53 and create a hosted zone

![image.png](images/image7.png)

![image.png](images/image8.png)

![image.png](images/image9.png)

Create a certificate 

![image.png](images/image10.png)

Go inside and then press Create records in Route 53

![image.png](images/image11.png)

That is a huge milestone! Getting the SSL certificate to "Success" means your **Domain**, **Route 53**, and **AWS Trust** are all properly linked.

In CloudFront

![image.png](images/image12.png)

![image.png](images/image13.png)

![image.png](images/image14.png)

![image.png](images/image15.png)

![image.png](images/image16.png)

![image.png](images/image17.png)

The final step looks like this 

![image.png](images/image18.png)

TLS is simply the modern, more secure version of SSL.

### **1. The SSL Certificate (Security)**

- **Purpose:** It handles the **Encryption**. It ensures that the data moving between your user's browser and AWS is private.
- **The "Padlock":** Without this, browsers like Chrome show a "Not Secure" warning. By attaching this to CloudFront, you've enabled **HTTPS** (port 443) for your domain.

### **2. CloudFront (The Speed/CDN)**

As a DevOps engineer, think of CloudFront as a **Global Cache**.

- **Latency:** If someone visits your site from London, they don't have to wait for the data to travel all the way from your S3 bucket in Ohio. Instead, CloudFront fetches it once, stores it in a "London Edge Location," and serves it instantly to the next visitor there.
- **Offloading:** It protects your "Origin" (the S3 bucket). Instead of S3 handling 1,000 requests, it handles **one** request from CloudFront, and CloudFront handles the other 999 from its cache.

![image.png](images/image19.png)

I choose the wrong  one now corrected it choosing Origin access control settings 

![image.png](images/image20.png)

CloudFront provides two ways to send authenticated requests to an Amazon S3 origin: *origin access control* (OAC) and *origin access identity* (OAI). OAC helps you secure your origins, such as Amazon S3.

Copy the policy as shown in the diagram 

![image.png](images/image21.png)

as you can see in the diagram above u can find the go to S3 bucket permissions where you can edit the policy to paste the above one 

![image.png](images/image22.png)

Even with the policy applied, CloudFront needs to know **which file** to show when someone just visits `vijayalakshmi-kurra-porfolio.website` without typing `/index.html`

![image.png](images/image23.png)

![image.png](images/image24.png)

Look at that `ANSWER: 4`. Those four IP addresses (`13.227.x.x`) are the front doors to the Amazon CloudFront global network

Faced the issue when trying to access the website . So did the trouble shooting . So I went and checked  my S3 bucket  where found that my
S3 Static Website Hosting is enabled . 

### **The Conflict: OAC vs. Static Hosting**

- **Static Website Hosting:** This makes S3 act like a public web server using a specific "Website Endpoint" (e.g., `s3-website.us-east-2...`). It ignores the OAC security handshake.
- **CloudFront OAC:** This treats S3 as a private storage bucket using the "REST API Endpoint" (e.g., `s3.us-east-2...`). OAC is more secure because it allows you to keep your bucket 100% private.

When both are enabled, they often conflict. S3 tries to "redirect" or handle requests in a way that breaks the OAC signature, resulting in that **403 Access Denied** XML error.

![image.png](images/image25.png)

### **The 5 Main Steps Completed**

1. **Storage (S3):**  Created an S3 bucket and uploaded your portfolio files (HTML, CSS, JS). You ensured the bucket was private to keep it secure.
2. **CDN & Security (CloudFront):** Created a distribution to serve your site globally. You set up **Origin Access Control (OAC)**, which is the "handshake" that allows CloudFront to fetch private files from S3.
3. **SSL/TLS Certificate (ACM):** Requested a free SSL certificate from AWS Certificate Manager so your site shows the **HTTPS** green padlock.
4. **DNS Management (Route 53 & Namecheap):** Pointed Namecheap domain to AWS Nameservers and created an **Alias A-Record** in Route 53 to map `vijayalakshmi-kurra-porfolio.website` to your CloudFront URL.
5. **The "Fixes":** Disabled S3 static hosting (to avoid conflicts) and set `index.html` as the **Default Root Object** so the site loads automatically.

![image.png](images/image26.png)

CI/CD implementation using GitHub Actions

### **The CI/CD Workflow Architecture**

1. **Push:** You push code to your GitHub `main` branch.
2. **Build:** GitHub Actions triggers a "Runner" (a temporary virtual machine).
3. **Sync:** The Runner logs into AWS and syncs your files to the **S3 Bucket**.
4. **Invalidate:** The Runner tells **CloudFront** to clear its cache so the new changes show up instantly.

### **Step 1: Create AWS Credentials for GitHub**

GitHub needs permission to talk to your AWS account.

1. Go to **IAM** in the AWS Console.
2. Create a new **User** (call it `github-action-user`).
3. Attach a policy directly: `AmazonS3FullAccess` and `CloudFrontFullAccess`.
4. Go to the **Security Credentials** tab for this user and create an **Access Key**.
5. **Save these!** You need the `Access Key ID` and `Secret Access Key`.

![image.png](images/image27.png)

![image.png](images/image28.png)

![image.png](images/image29.png)

![image.png](images/image30.png)

![image.png](images/image31.png)

Adding the code to calculate the number of views and this requires the following stack 

1. Dynamo DB
2. Lambda function 
3. Gateway 

To add a visitor counter, we need to move beyond "Static" files and into **Serverless Computing**. Since S3 cannot "count" (it just stores files), we need a small backend team to do the work.

This is a core requirement of the **Cloud Resume Challenge**, and it uses the "Power Trio" of AWS Serverless: **DynamoDB** (Database), **Lambda** (Brain), and **API Gateway** (Doorway).

### **The Architecture of Your Counter**

1. **DynamoDB:** A table that stores a single number (e.g., `Views: 42`).
2. **Lambda:** A tiny Python or Node.js script that wakes up, adds `+1` to the DynamoDB number, and sends the new number back.
3. **API Gateway:** A URL that your JavaScript can "call" to trigger the Lambda.
4. **JavaScript:** A simple script in your `index.html` that runs every time the page loads.

1. Go to **DynamoDB** console -> **Create table**.
2. Table name: `PortfolioCounter`.
3. Partition key: `id` (String).
4. Click **Create**.
5. Once created, click **Explore items** -> **Create item**.
    - Set `id` to `1`.
    - Add a new attribute -> **Number**.
    - Name it `views` and set the value to `0`.

![image.png](images/image32.png)

![image.png](images/image33.png)

![image.png](images/image34.png)

![image.png](images/image35.png)

![image.png](images/image36.png)

enable CORS 

![image.png](images/image37.png)

![image.png](images/image38.png)

![image.png](images/image39.png)

In Real scenarios you never expose your lambda functions they shud b  API Gateway infront of for security and Throttling purpose as if you get exposed to any malicious  bot then it will make ur lambda functions run many times which result in u paying money

Going with the **HTTP API** is the "Modern DevOps" way—it's cheaper than the REST API and much faster to set up.

  

![image.png](images/image40.png)

**Configure Integrations:** * Click **Add integration**.

- Select **Lambda**.
- Select your region (`us-east-2`) and pick your `VisitorCounterFunction`.
- **API Name:** `Portfolio-API`

![image.png](images/image41.png)

![image.png](images/image42.png)

![image.png](images/image43.png)

![image.png](images/image44.png)

![image.png](images/image45.png)

If you can see the number in your browser at that link, it means the entire "Backbone" of your cloud resume is successfully built: **DynamoDB** stores the data, **Lambda** processes the math, and **API Gateway** provides the secure doorway.

![image.png](images/image46.png)

![image.png](images/image47.png)

When you check the Resource-based policy statement in Lambda Functions you should be able to see the apigateway getting populated on its own. Which prevents the lambda to be accessed from outside other than thru API Gateway

![image.png](images/image48.png)

![image.png](images/image49.png)
