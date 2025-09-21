// Sample data for creating blogs via POST /api/blogs

export const sampleBlogInputs = [
  {
    slug: "introduction-to-machine-learning",
    title: "Introduction to Machine Learning: A Beginner's Guide",
    tldr: "A comprehensive introduction to machine learning concepts, algorithms, and real-world applications for beginners.",
    content: `
# Introduction to Machine Learning

Machine Learning (ML) is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task.

## What is Machine Learning?

Machine learning algorithms build mathematical models based on training data to make predictions or decisions without being explicitly programmed to perform the task. It's used in a wide variety of applications, such as email filtering and computer vision.

## Types of Machine Learning

### 1. Supervised Learning
In supervised learning, algorithms learn from labeled training data to make predictions on new, unseen data.

### 2. Unsupervised Learning
Unsupervised learning finds hidden patterns in data without labeled examples.

### 3. Reinforcement Learning
This type involves an agent learning to make decisions by taking actions in an environment to maximize reward.

## Common Algorithms

- **Linear Regression**: For predicting continuous values
- **Decision Trees**: For classification and regression
- **Neural Networks**: For complex pattern recognition
- **K-Means**: For clustering data

## Applications

Machine learning is everywhere around us:
- Recommendation systems (Netflix, Spotify)
- Search engines (Google)
- Social media feeds
- Autonomous vehicles
- Medical diagnosis

## Getting Started

To begin your ML journey:
1. Learn Python or R
2. Understand statistics and linear algebra
3. Practice with datasets
4. Use libraries like scikit-learn, TensorFlow, or PyTorch

## Conclusion

Machine learning is transforming industries and creating new possibilities. Start with the basics, practice regularly, and stay curious!
    `,
    readTime: 8,
    tags: ["machine-learning", "ai", "beginner", "tutorial"],
    categories: ["Technology", "Education"],
    poster: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    banner: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200",
    authorId: "cmftuog0q0000w49olaww1wl4", // Replace with actual user ID
    type: "BLOG",
  },
  {
    slug: "web-development-trends-2024",
    title: "Web Development Trends to Watch in 2024",
    tldr: "Explore the latest web development trends including AI integration, micro-frontends, and progressive web apps.",
    content: `
# Web Development Trends to Watch in 2024

The web development landscape continues to evolve rapidly. Here are the key trends shaping the industry in 2024.

## 1. AI-Powered Development

Artificial intelligence is revolutionizing how we build websites:
- **Code Generation**: AI tools like GitHub Copilot and ChatGPT
- **Automated Testing**: AI-driven test case generation
- **Design Assistance**: AI-powered design tools and suggestions

## 2. Micro-Frontends Architecture

Breaking down monolithic frontends into smaller, manageable pieces:
- Independent deployment cycles
- Technology diversity across teams
- Better scalability and maintenance

## 3. Progressive Web Apps (PWAs)

PWAs continue to bridge the gap between web and native apps:
- Offline functionality
- Push notifications
- App-like user experience
- Improved performance

## 4. Serverless and Edge Computing

Moving computation closer to users:
- Faster response times
- Reduced server costs
- Better scalability
- Edge functions for dynamic content

## 5. WebAssembly (WASM)

Bringing near-native performance to web applications:
- High-performance applications in the browser
- Language diversity (Rust, C++, Go)
- Gaming and multimedia applications

## 6. Low-Code/No-Code Platforms

Democratizing web development:
- Faster prototyping
- Reduced development time
- Business users can build applications
- Visual development interfaces

## 7. Web3 and Blockchain Integration

Decentralized web technologies:
- Cryptocurrency payments
- NFT marketplaces
- Decentralized identity
- Smart contracts

## 8. Sustainability in Web Development

Green coding practices:
- Optimized code for lower energy consumption
- Efficient hosting solutions
- Sustainable design principles
- Carbon footprint awareness

## Conclusion

Staying updated with these trends is crucial for modern web developers. Focus on learning technologies that align with your career goals and project requirements.
    `,
    readTime: 12,
    tags: ["web-development", "trends", "ai", "pwa", "serverless"],
    categories: ["Technology", "Web Development"],
    poster:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    banner:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200",
    authorId: "cmftuog0q0000w49olaww1wl4", // Replace with actual user ID
    type: "BLOG",
  },
  {
    slug: "cybersecurity-best-practices",
    title: "Cybersecurity Best Practices for Developers",
    tldr: "Essential cybersecurity practices every developer should implement to protect applications and user data.",
    content: `
# Cybersecurity Best Practices for Developers

In today's digital landscape, cybersecurity is not optional—it's essential. Here are the key practices every developer should follow.

## 1. Secure Coding Principles

### Input Validation
- Never trust user input
- Validate on both client and server side
- Use parameterized queries to prevent SQL injection
- Sanitize all data before processing

### Authentication and Authorization
- Implement strong password policies
- Use multi-factor authentication (MFA)
- Follow the principle of least privilege
- Regularly review and update access controls

## 2. Data Protection

### Encryption
- Encrypt data at rest and in transit
- Use strong encryption algorithms (AES-256)
- Properly manage encryption keys
- Implement end-to-end encryption for sensitive data

### Secure Data Storage
- Never store passwords in plain text
- Use salted hashes for password storage
- Implement proper session management
- Follow data retention policies

## 3. API Security

### Authentication
- Use OAuth 2.0 or JWT tokens
- Implement rate limiting
- Validate all API inputs
- Use HTTPS for all API communications

### API Design
- Follow RESTful security principles
- Implement proper error handling
- Use API versioning
- Document security requirements

## 4. Infrastructure Security

### Server Security
- Keep systems updated and patched
- Use firewalls and intrusion detection
- Implement monitoring and logging
- Regular security audits and penetration testing

### Cloud Security
- Follow cloud provider security guidelines
- Use Identity and Access Management (IAM)
- Implement network security groups
- Monitor cloud resources regularly

## 5. Development Process Security

### Secure SDLC
- Security requirements gathering
- Threat modeling
- Security code reviews
- Security testing (SAST, DAST, IAST)

### Dependency Management
- Regularly update dependencies
- Use dependency scanning tools
- Monitor for known vulnerabilities
- Implement software composition analysis

## 6. Incident Response

### Preparation
- Develop incident response plans
- Regular security training for team
- Establish communication protocols
- Maintain updated contact lists

### Detection and Response
- Implement logging and monitoring
- Set up alerts for suspicious activities
- Quick response procedures
- Post-incident analysis and learning

## 7. Compliance and Standards

### Regulatory Compliance
- GDPR for data protection
- HIPAA for healthcare data
- PCI DSS for payment processing
- SOX for financial reporting

### Security Frameworks
- OWASP Top 10
- NIST Cybersecurity Framework
- ISO 27001
- SANS Critical Security Controls

## Tools and Resources

### Security Testing Tools
- OWASP ZAP for web application testing
- SonarQube for code quality and security
- Snyk for dependency vulnerability scanning
- Burp Suite for penetration testing

### Learning Resources
- OWASP documentation
- Security conferences and workshops
- Online security courses
- Security communities and forums

## Conclusion

Cybersecurity is an ongoing process, not a one-time implementation. Stay informed about the latest threats, regularly update your security practices, and foster a security-conscious culture in your development team.

Remember: The cost of prevention is always less than the cost of a security breach.
    `,
    readTime: 15,
    tags: ["cybersecurity", "security", "best-practices", "development"],
    categories: ["Security", "Development"],
    poster: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    banner: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200",
    authorId: "cmftuog0q0000w49olaww1wl4", // Replace with actual user ID
    type: "BLOG",
  },
];

/*
Usage Instructions:
1. Replace authorIds with actual user IDs from your database
2. Use these objects as request bodies for POST requests to /api/blogs
3. Example curl command:

curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '[
    {
      "slug": "introduction-to-machine-learning",
      "title": "Introduction to Machine Learning: A Beginner'\''s Guide",
      "tldr": "A comprehensive introduction to machine learning concepts...",
      "content": "# Introduction to Machine Learning...",
      "readTime": 8,
      "tags": ["machine-learning", "ai", "beginner"],
      "categories": ["Technology", "Education"],
      "poster": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      "banner": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200",
      "authorId": "your-actual-user-id-here",
      "type": "BLOG"
    }
  ]'
*/
