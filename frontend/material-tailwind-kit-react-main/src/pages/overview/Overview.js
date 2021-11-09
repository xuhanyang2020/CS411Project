 import DefaultNavbar from 'components/DefaultNavbar';
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
import CardFooter from "@material-tailwind/react/CardFooter";
import GatherSportNav from 'components/GatherSportNav';
import axios from 'axios';
import Page from 'components/login/Page';
import Moment from 'moment'
import Image from "@material-tailwind/react/Image";
import SportImage from "assets/img/soccer.jpeg"
import Button from "@material-tailwind/react/Button";
import H1 from "@material-tailwind/react/Heading1";



const overviewURL = 'http://localhost:8080/overview';

async function getOverview_Res(){
    const id = '24';
    const reservations_back = await axios.get(overviewURL,
        {
            params:{
                id : id
            }

    });
        
     
    return reservations_back;
}

async function getSportStar(){
    const sportStarList = await axios.get(overviewURL + "/sportstar")

    return sportStarList;
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            reservations: [],
            sportStarList: []
        })
    }

    async componentDidMount(){
        const reservations = await getOverview_Res();

        const sportStarList = await getSportStar();

        this.setState({
            reservations: reservations,
            sportStarList: sportStarList
        });
    }

    render() {
        console.log(this.state.reservations);
        if (!this.state.reservations || this.state.reservations.length === 0) {
            return <div> Loading...</div>
        }
        return (
            <Page>
            <GatherSportNav/>
            <div className="overviewSection">
                {this.state.reservations.data.map(reservation => (
                    <Card key={reservation.CourtId} className="reservationCard">
                    <CardImage className="mateImage" src={SportImage} alt="Card Image"/>
        
                    <CardBody>
                        <H6 color="gray">{Moment(reservation.beginTime).format("DD MMM, YYYY")}</H6>
                        <Paragraph color="gray">
                        {reservation.courtId}
                        </Paragraph>
                    </CardBody>
                <Button color="lightBlue" size="lg" ripple="light">
                    Cancel Now
                </Button>
                </Card>
                ))}
            </div>
            <div className="spiltLine">
                <H1 color="lightGreen">Who is the most active star?</H1>
            </div>
            <div className="overviewSection">
                {this.state.sportStarList.data.map(star => (
                    <Card className="sportStarCard">
                    <Image className="mateImage" src={Profile} rounded={true}
            raised={false}
            alt="Rounded Image"/>
                    <CardBody>
                        <H6 color="gray">{star.name}</H6>
                        <Paragraph color="gray">
                        {star.reservationTimes} Times !
                        </Paragraph>
                    </CardBody>
                </Card>
                ))}
            </div>
            <DefaultFooter/>
            </Page>
        );
    }
}
export default Overview;