import { Component } from 'react';
import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import CardFooter from "@material-tailwind/react/CardFooter";
import Profile from 'assets/img/boy.jpeg';
import './styles.course.css';
import TeamSection from 'components/landing/TeamSection';
import GatherSportNav from 'components/GatherSportNav';
import axios from 'axios';
import Page from 'components/login/Page';
import Moment from 'moment'
import Image from "@material-tailwind/react/Image";
import Button from "@material-tailwind/react/Button";
import H1 from "@material-tailwind/react/Heading1";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import H2 from "@material-tailwind/react/Heading2";



const courseURL = 'http://localhost:8080/course';
const sportURL = "http://localhost:8080/sport"

async function getSports(){
    console.log("get sport list");
    const sportList = await axios.get(sportURL);

    console.log(sportList[0]);
    return sportList;
}

async function recommendCourseByType(userid){
    const courseListMates = await axios.get(courseURL + "/mate",
        {
            params:{
                id : userid
            }

    });

    // this.setState({
    //     typeBased: "false",
    //     hobbyBased: "false",

    // })

}

async function findAllCourse(userid){
    const courseListAll = await axios.get(courseURL);

    return courseListAll;
}

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            id: "",
            courseList: [],
            sportList: []
        })
    }
    // send deleting request to back-end for canceling specific reservation
    async recommendCourseByHobby(userid){
        console.log(userid);
        const courseListHobby = await axios.get(courseURL + "/hobby",
            {
                params:{
                    id : userid
                }
    
        });
        this.setState({       
        });
        
        
        //return courseListHobby;
    }

    async componentDidMount(){
        // extract params from url
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let id = params.get('id');
        console.log(id);
        // call two functions and render the page
        // this.state.id = id;
        this.setState({
            id: id, 
            sportList: await (await getSports()).data
        });
        console.log(1);
    }

    render() {
        // console.log(this.state.reservations);
        // if (!this.state.reservations || this.state.reservations.length === 0) {
        //     return <div> Loading...</div>
        // }
        return (
            <Page> 
                
                <GatherSportNav username="RUTH SABIN"/>

                <TeamSection/>

                {/* <div className="Header">
        <H2 color="indigo">Select Your Course</H2>

</div> */}
            <div className="HobbySelection">
                <Button
                    color="indigo"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    // onClick={async()=> {
                    //     await this.recommendCourseByHobby(this.state.id)
                    //   }}
                >
                    reservation
                </Button>
        </div>

                <div className="MateSelection">
                    <Button
                        color="indigo"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                    >
                        Sport mates
                    </Button>
                </div> 

                <div className="TypeSelection">
                    <Dropdown
                        color="indigo"
                        placement="bottom-start"
                        buttonText="Regular Dropdown"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        ripple="light"
                    >
                        {this.state.sportList.map(sport=>(
                            <DropdownItem
                            
                            color="lightBlue"
                            ripple="light"
                            
                        >
                           {sport}
                        </DropdownItem>
                        ))}                      
                    </Dropdown>
                    
                </div>  
                <div height="500px">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>          
                </Page>
                
            // <Page>
            // <GatherSportNav username="RUTH SABIN"/>
            // <div className="CourseTitle"> 
            //     <H2 color="indigo">Select Your Course</H2>
            // </div>
            // <div className="TypeSelection">
            // <Dropdown
                  
            //             color="lightBlue"
            //             placement="bottom-start"
            //             buttonText="ChooseSport"
            //             buttonType="filled"
            //             size="regular"
            //             rounded={false}
            //             block={false}
            //             ripple="light"> 
            //          </Dropdown>
                  
            //     </div>
            
                
            
            // {/* <DefaultFooter/> */}
            // </Page>
        );
    }
}
export default Course;