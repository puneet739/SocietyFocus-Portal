angular.module("myapp", [])
    .controller("applicationController", function($scope,$http) {

        $scope.app = {
            name: 'Society Focus',
            theme1: {
                name: 'Society Focus',
                desciprtion: 'Resident Welfare application wherein Members of the society and residents are interconnected',
            },
            theme2: {
                name: 'Society Focus',
                desciprtion: 'application that makes connection within society members and society members with RWA.',
            },
            service: {
                title: 'Delivers business through  people centered approach, No matter how big you are,public or private and in what sector or industry you do business,we can help you work smarter and get your all the issues solved at a single touch.Have a look at services we offered ',
                services: [{
                    image: 'fa-fort-awesome',
                    title: 'Community Hall',
                    description: 'Complete Online booking management',
                }, {
                    image: 'fa-users',
                    title: 'User Directory',
                    description: 'Complete User Directory',
                }, {
                    image: 'fa-registered',
                    title: 'RWA Panel',
                    description: 'Connection with RWA online management',
                }, {
                    image: 'fa-tablet',
                    title: 'Notice Board',
                    description: 'Only Complete Notice Board for Society',
                }, {
                    image: 'fa-inbox',
                    title: 'User Notification',
                    description: 'Panel can send Notifications to user',
                }, {
                    image: 'fa-sitemap',
                    title: 'Panel Listing',
                    description: 'Complete RWA panel for Users',
                }, {
                    image: 'fa-life-ring',
                    title: 'Daily Issues',
                    description: 'Plumber/Electirican/Garder booking on single touch',
                }, {
                    image: 'fa-forumbee',
                    title: 'Facilites',
                    description: 'Searching near by Saloon/Hospital/etc',
                }, {
                    image: 'fa-hourglass-start',
                    title: 'Complaints',
                    description: 'User Complaint Register/Tracking eg:Water Seapage, Park',
                }, {
                    image: 'fa-calendar-check-o',
                    title: 'Calendar',
                    description: 'Society Event Calendar',
                }, {
                    image: 'fa-file-image-o',
                    title: 'Society Image',
                    description: 'Upload Society Event Image Gallery',
                }, {
                    image: 'fa-car',
                    title: 'Parking',
                    description: 'Complete Society Car Security Management',
                }, {
                    image: 'fa-umbrella',
                    title: 'Creative Idea',
                    description: 'Great Idea For Complete Society Management',
                }, {
                    image: 'fa-cloud',
                    title: 'Awesome Support',
                    description: '24/7 Support',
                }],
            },
            screenshot:{
                title:'ScreenShots of Our application',
                tags:[{
                    title:'Application HomePage',
                    img:'images/snapshot/homepage.png',
                },{
                    title:'HomePage2',
                    img:'images/snapshot/homepage.png',
                },]
            },
            aboutus: 'Society Focus is an application that makes connection within society members and society members with RWA. \n Society Focus portal is quite simple for managing the day to day running issues of society members and RWA at a very reasonable cost. The application(android/web) is fast and our experience in setting up the database for our society is very smooth and easy.',
            portfolio: {
                title: '',
                clients: [{
                    name: 'SocietName1',
                    img_url: 'images/portfolio/1.jpg',
                }, {
                    name: 'SocietName2',
                    img_url: 'images/portfolio/2.jpg',
                }],
            },
            client: 20,
            feedback: 200,
            awards: 10,
            pricing_title: 'Have a look at our pricing strategy and try to understand with whatever matches your requirement.',
            pricing: [{
                title: 'Basic',
                price: '5',
                duration: 'User',
                line1: 'Free Setup',
                line2: 'Bunch Of Surprises',
                line3: 'Live Tracking',
                line4: '24/7 Support',
            }, {
                title: 'Premimum',
                price: '5000',
                duration: '3 Month',
                line1: 'Free Setup',
                line2: 'All Services',
                line3: 'New Enhanchments',
                line4: '24/7 Support',
            }],
            team: {
                title: 'We have a team that works together that allows them to work beyond their limitations. Our team has a potential to fulfil their commitments. We have become the artistic way to serve the need of today’s society/generation',
                users: [{
                    name: 'Puneet',
                    designation: 'CEO',
                    description: 'The person behind the application core',
                    fb_link: '',
                    img_url: 'https://scontent.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/946388_10151706606318384_150244286_n.jpg?oh=9d3c71ef9d4459acc7ae48c565ee8868&oe=576B8551',
                    linkendn: '',
                }, {
                    name: 'Jyotishman',
                    designation: 'Mobile Head',
                    description: 'The application heart',
                    fb_link: '',
                    img_url: 'https://scontent.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/41353_1378737226203_5653175_n.jpg?oh=79a1326115fabcbd712f1eeba255b6aa&oe=5770A121',
                    linkendn: '',
                }, {
                    name: 'Ankit Ghosh',
                    designation: 'Web Lead',
                    description: 'The core for the application',
                    fb_link: '',
                    img_url: 'https://scontent.xx.fbcdn.net/hphotos-prn2/v/t1.0-0/p206x206/1009831_10201613654883305_43799050_n.jpg?oh=b00b28b9dd884a99de23df2eecbf364d&oe=57642FA2',
                    linkendn: '',
                }, {
                    name: 'Raj Darai',
                    designation: 'Creative Head',
                    description: 'Complete application design in charge',
                    fb_link: '',
                    img_url: 'http://propertyplayer.co.in/propertyplayer/resources/images/team/creative.jpg',
                    linkendn: '',
                }]
            },
            contactus: {
                title: 'Thank-you for your interest in us. Please provide us with the following information to serve you better',
                description: 'Society Focus is ready to help you with whatever and whenever you require',
                latitude: '28.478161',
                longitude: '77.304633',
                address: '#124, Sector 37, Faridabad, Haryana, 121003',
                phone: '9711616135',
                email: 'ceo@societyfocus.com',
                website: 'www.societyfocus.com',
                facebook: 'https://www.facebook.com/societyfocus',
            }
        }

        $scope.submitFeedback = function(feedback) {
            console.log("Sending feedback: " + feedback)
            feedback.description=feedback.subject+':::'+feedback.message;
            var req = {
                method: 'POST',
                url: 'http://societyfocus.com/service/v1/feedback/save',
                data: feedback,
            }
            $http(req).then(function successCallback(response) {
                console.log('Feedback Submitted Successfully');
                alert('Feedback Submitted Successfully');
            });
        }
    });