import DefaultFooter from 'components/DefaultFooter';
import { Component } from 'react';
import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Profile from 'assets/img/boy.jpeg';
import './styles.overview.css';
import GatherSportNav from 'components/GatherSportNav';
import axios from 'axios';
import Page from 'components/login/Page';
import Moment from 'moment'
import Image from "@material-tailwind/react/Image";
import Button from "@material-tailwind/react/Button";
import H1 from "@material-tailwind/react/Heading1";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";
import Header from 'components/landing/Header';
import StatusCard from 'components/landing/StatusCard';
import HeaderBackground from 'components/HeaderBackground';
import Training from 'assets/img/Training.jpg';


const overviewURL = 'http://localhost:8080/overview';
// send request to back-end for getting reservation of specific userid
async function getOverview_Res(userid){
    const reservations_back = await axios.get(overviewURL + "/reservation",
        {
            params:{
                id : userid
            }

    });
        
    console.log(reservations_back);     
    return reservations_back;
}

async function getOverview_AcceptedAppoint(userid){
    const appointments_accept = await axios.get(overviewURL + "/appointment/T", {
        params:{
            id: userid
        }
    })

    return appointments_accept;
}

async function getOverview_IncomingAppoint(userid){
    const appointments_incoming = await axios.get(overviewURL + "/appointment/F", {
        params:{
            id: userid
        }
    })

    return appointments_incoming;
}

async function getOverview_Enroll(userid){
    const enrollment_back = await axios.get(overviewURL + "/enrollment", {
        params:{
            id: userid
        }
    })

    return enrollment_back;
}

// send request to back-end for getting sportstar for all reservations
async function getReservationStar(){
    const reservationStarList = await axios.get(overviewURL + "/reservationstar")
    console.log(reservationStarList);
    return reservationStarList;
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            id: "",
            reservations: [],
            reservationStarList: [],
            appointments_accept: [],
            appointments_incoming: [],
            enrollments:[]
        })
    }
    // send deleting request to back-end for canceling specific reservation
    async deleteReservation(reservationid_delete){
        await axios.post(overviewURL + "/reservation/cancel" + '/' + reservationid_delete)

        // update front-page when some reservation is canceled
        var pos = 0
        for (var i = 0; i < this.state.reservations.data.length; i++) {
            if (this.state.reservations.data[i].reservationId === reservationid_delete){
                pos = i
                // traverse all the positions, find position of canceled reservation
            }       
        }
        this.state.reservations.data.splice(pos,1)
        this.setState({       
        });
    }

    async componentDidMount(){
        // extract params from url
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let id = params.get('id');
        // call two functions and render the page
        this.setState({
            reservations: await getOverview_Res(id),
            enrollments: await getOverview_Enroll(id),
            reservationStarList: await getReservationStar(),
            appointments_accept: await getOverview_AcceptedAppoint(id),
            appointments_incoming: await getOverview_IncomingAppoint(id),
            id: id
        });
    }

    render() {
        console.log(this.state.reservations);
        if (!this.state.reservations || this.state.reservations.length === 0) {
            return <div></div>
        }
        return (
            <Page>
            <GatherSportNav username="RUTH SABIN"/>
            <HeaderBackground/>
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap relative z-50">
                    <StatusCard color="red" icon="stars" title="Reservation">
                        In GatherSport application, you can make reservation of courts on campus for 
                        time that suits you best!
                    </StatusCard>
                    <StatusCard
                        color="lightBlue"
                        icon="autorenew"
                        title="Course"
                    >
                        In order to better help sportfans get started with a sport, 
                        we provide you with diverse sports courses!
                    </StatusCard>
                    <StatusCard
                        color="teal"
                        icon="fingerprint"
                        title="Appointment"
                    >
                        In-person appointments could be made with professional coaches
                        for detailed instructions, which helps you become a sport star!
                    </StatusCard>
                </div>
            </div>

            <div className="splitLine">
                <H1 color="indigo">Court Reservation</H1>
            </div>
            <div className="overviewSection">
                {this.state.reservations.data.map(reservation => (
                    <Card key={reservation.CourtId} className="reservationCard">
                    <CardImage className="mateImage" src={require('assets/img/'+reservation.userId+'.jpg').default} alt="Card Image"/>
        
                    <CardBody>
                        <H6 color="gray">{Moment(reservation.beginTime).format("DD-MMM-YYYY HH:mm:ss")}</H6>
                        <Paragraph color="gray">
                        {reservation.courtId}
                        </Paragraph>
                    </CardBody>
                <Button color="lightBlue" size="lg" ripple="light" onClick={async()=> {
                        await this.deleteReservation(reservation.reservationId)
                      }}>
                    Cancel Now
                </Button>
                </Card>
                ))}
            </div>

            

            <div className="splitLine">
                <H1 color="blue">Course Enrollment</H1>
            </div>
            <div className="overviewSection">
                {this.state.enrollments.data.map(enrollment => (
                
                    <Card className="reservationCard">
                        <CardRow>
                            <CardHeader color="lightBlue" size="lg" iconOnly>
                                <Icon name="groups" size="5xl" color="white" />
                            </CardHeader>

                            <CardStatus title={enrollment.name} amount="Tuesday 9pm" />
                        </CardRow>

                        <CardStatusFooter color="green" amount="56%" date={"  Course Until  "+Moment(enrollment.endDate).format("YYYY-MMM-DD")}>
                        </CardStatusFooter>
                    </Card>
                
                ))}

            </div>
            <div className="splitLine">
                <H1 color="indigo">Coach Appointment</H1>
            </div>
            <div className="overviewSection">

                <div className="incomingAppSection">
                {this.state.appointments_accept.data.map(appointment => (
                
                    <Card className="reservationCard">
                        <CardRow>
                            <CardHeader color="lightBlue" size="lg" iconOnly>
                                <Icon name="groups" size="5xl" color="white" />
                            </CardHeader>

                            <CardStatus color="indigo" title={appointment.location} amount={appointment.teacherName} />
                        </CardRow>

                        <CardStatusFooter color="green" amount={Moment(appointment.time).format("YYYY-MMM-DD HH:mm:ss")}>
                        </CardStatusFooter>
                    </Card>
                
                ))}
                </div>
            </div>
            
            
           

            <div className="splitLine">
                <H1 color="teal">Who is the most active star?</H1>
            </div>

            <div className="overviewSection">
                {this.state.reservationStarList.data.map(star => (
                    <Card className="sportStarCard">
                    <Image className="mateImage" src={Profile} rounded={true}
            raised={false}
            alt="Rounded Image"/>
                    <CardBody>
                        <H6 color="gray">{star.name}</H6>
                        <Paragraph color="gray">{star.type} <br/>
                        {star.reservationTimes} Times !
                        </Paragraph>
                    </CardBody>
                </Card>
                ))}
            </div>
            {/* <DefaultFooter/> */}
        </Page>
        );
    }
}
export default Overview;