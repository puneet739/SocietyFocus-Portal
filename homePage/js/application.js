angular.module("myapp", [])
    .controller("applicationController", function($scope) {

        $scope.app = {
            name:'Society Focus',
        	theme1 :{
        		name:'Society Focus',
        		desciprtion:'Resident Welfare application wherein Members of the society and residents are interconnected'	,
        	},
        	theme2 :{
        		name:'Society Focus',
        		desciprtion:'application that makes connection within society members and society members with RWA.'	,
        	},
            service: {
                title:'Delivers business through  people centered approach, No matter how big you are,public or private and in what sector or industry you do business,we can help you work smarter and get your all the issues solved at a single touch.Have a look at services we offered ',
                services:[{
                    image:'fa-flask',
                    title:'Brand Identity',
                    description:'Brand Identity',
                },{
                    image:'fa-umbrella',
                    title:'Creative Idea',
                    description:'Creative Idea',
                }],
                brand_desc:'Brand Descriotion',
                creative_desc:'Creating Desc',
                support_desc:'Society Focus Awsme Support',
            },
            aboutus:'Society Focus is an application that makes connection within society members and society members with RWA. \n Society Focus portal is quite simple for managing the day to day running issues of society members and RWA at a very reasonable cost. The application(android/web) is fast and our experience in setting up the database for our society is very smooth and easy.',
            portfolio:{
                title:'',
                clients:[{
                    name:'SocietName1',
                    img_url:'images/portfolio/1.jpg',
                },{
                    name:'SocietName2',
                    img_url:'images/portfolio/2.jpg',
                }],
            },
            client:20,
            feedback:200,
            awards:10,
            pricing_title:'Have a look at our pricing strategy and try to understand with whatever matches your requirement.',
            pricing:[{
                title:'Basic SocietyFocus',
                price:'9',
                duration:'Month',
                line1:'Free Setup',
                line2:'10GB Storage',
                line3:'100GB Bandwith',
                line4:'5 Products',
            },{
                title:'Basic SocietyFocus',
                price:'9',
                duration:'Month',
                firstLine:'Line1',
                secondLine:'Line2',
                thirdLine:'Line3',
            }],
            team:{
                title:'We have a team that works together that allows them to work beyond their limitations. Our team has a potential to fulfil their commitments. We have become the artistic way to serve the need of today’s society/generation',
                users:[{
                    name:'Puneet',
                    designation:'CEO',
                    description:'The person behind the application core',
                    fb_link:'',
                    img_url:'https://scontent-sin1-1.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/10246680_10152384303833384_602455757870332735_n.jpg?oh=07597d070b9bb20752e4f5c833ef8d28&oe=575DE4B6',
                    linkendn:'',
                }]
            },
            contactus:{
                title:'Thank-you for your interest in us. Please provide us with the following information to serve you better',
                description:'Society Focus is ready to help you with whatever and whenever you require',
                latitude:'28.478161',
                longitude:'77.304633',
                address:'#124, Sector 37, Faridabad, Haryana, 121003',
                phone:'9711616135',
                email:'ceo@societyfocus.com',
                website:'www.societyfocus.com',
                facebook:'https://www.facebook.com/societyfocus',
            }
        }
    });

    