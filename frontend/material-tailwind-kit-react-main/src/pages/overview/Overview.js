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
import GatherSportNav from 'components/GatherSportNav';
import axios from 'axios';
import Page from 'components/login/Page';
import Moment from 'moment'



const overviewURL = 'http://localhost:8080/overview';

async function getOverview_Res(){
    const id = '284';
    const reservations_back = await axios.get(overviewURL,
        {
        paras: {
            id : id
        }
    });
        
     
    return reservations_back;
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            reservations: [],
        })
    }

    async componentDidMount(){
        const reservations = await getOverview_Res();

        this.setState({
            reservations: reservations,
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
                    <Card key={reservation.CourId} className="reservationCard">
                    <CardImage className="mateImage" src={Profile} alt="Card Image"/>
        
                    <CardBody>
                        <H6 color="gray">{Moment(reservation.beginTime).format("DD MMM, YYYY")}</H6>
                        <Paragraph color="gray">
                        {reservation.courtId}
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
