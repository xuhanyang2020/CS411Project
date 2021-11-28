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



const overviewURL = 'http://localhost:8080/overview';
// send request to back-end for getting reservation of specific userid
async function getOverview_Res(userid){
    const reservations_back = await axios.get(overviewURL,
        {
            params:{
                id : userid
            }

    });
        
     
    return reservations_back;
}

// send request to back-end for getting sportstar for all reservations
async function getReservationStar(){
    const reservationStarList = await axios.get(overviewURL + "/reservationstar")

    return reservationStarList;
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            reservations: [],
            reservationStarList: [],
            sportTypeList: []
        })
    }
    // send deleting request to back-end for canceling specific reservation
    async deleteReservation(reservationid_delete){
        await axios.post(overviewURL + "/cancel/" + reservationid_delete)

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
            reservationStarList: await getReservationStar(),
        });
    }

    render() {
        console.log(this.state.reservations);
        if (!this.state.reservations || this.state.reservations.length === 0) {
            return <div> Loading...</div>
        }
        return (
            <Page>
            <GatherSportNav username="RUTH SABIN"/>
            <div className="splitLine">
                <H1 color="indigo">Your Reservation</H1>
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