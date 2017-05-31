# SocietyFocus -- Open Society Management Application. 
# http://www.societyfocus.com
### https://play.google.com/store/apps/details?id=com.zircon.app

Society Focus is a Resident Welfare application wherein Members of the society and residents are interconnected.
Resident get there issues/problems solved in a single touch. 
The best in class application for all the society needs varying from security issues to complete user directory. Features provided by SocietyFocus are 

  - All Residents Directory.
  - Complaint Booking.
  - Complaint Tracking for individuals.
  - Service bookings for ex: Electirican, Plumber, Gardner services provided by society heads for free.
  - Service bookings by external vendors
  - Nearby Store locator.
  - Emergengy numbers for Society. 
  - Online payment reminders to residents. 
  - Online Collection of society payments.
  - Society Forum to discuss the society related issues. 
  - Legal advice from third party vendor. 
  - Vehicle Management System. 
  - Gated Societies can track of any cars entering or exiting the society. 

# Getting Started
Using Society Focus is easy and simple for any society admins. 
Just drop a mail to ceo@societyfocus.com to get your society registered. 

# Donation
We are accepting donation for running and providing services. 
https://www.paypal.me/PuneetBehl

```
Steps for Running on local: 
1) Download Nginx from http://nginx.org/en/download.html
2) Change port which is available for you at conf/nginx.conf
3) go to nging/html folder. 
4) Clone your HTML code there. 
5) update Following in nginx.conf 
    server {
        listen       8089;
        location /service{
            resolver 8.8.8.8;
            proxy_pass http://societyfocus.com/service;
        }

6) Change server url in resources/js/main.js to serviceURL : http://localhost:8089/service/

```
Project managed by Team Society Focus. 
Puneet Behl  -- Puneet739@gmail.com -- CEO@societyfocus.com
```