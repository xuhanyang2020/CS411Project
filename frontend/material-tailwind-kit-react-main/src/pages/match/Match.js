import { Component } from 'react';
import React from "react";
import Card from '@material-tailwind/react/Card';
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from '@material-tailwind/react/CardBody';
import Paragraph from '@material-tailwind/react/Paragraph';
import H6 from "@material-tailwind/react/Heading6";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import Input from "@material-tailwind/react/Input";
import LeadText from "@material-tailwind/react/LeadText";
import GatherSportNav from 'components/GatherSportNav';
import fakeProfile from 'assets/img/profile_default.jpeg';
import Page from 'components/login/Page';
import axios from 'axios';
import './styles.match.css';

const baseURL = 'http://localhost:8080/match/mates';
const infoURL = 'http://localhost:8080/profile';


class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mates: [],
            age: '', 
            gender: '', 
            major: '',
        }

        this.onAgeChange = this.onAgeChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onMajorChange = this.onMajorChange.bind(this);
        this.searchByName = this.searchByName.bind(this);
    }

    async getMates(search) {
        // TODO: change id to props later
        const id = '24';
        // console.log(this.state.major);
        // console.log(this.state.gender);
        // console.log(this.state.age);
        const mate_ids = await axios.get(baseURL, 
            {
            params: {
                id: id,
                age: this.state.age, 
                gender: this.state.gender,
                major: this.state.major,
                search: search,
            }
        });
        const mates_info = [];
        
        for (const mate_id of mate_ids.data) {
            var result = await axios.get(infoURL+'/'+mate_id);
            mates_info.push(result.data[0]);
        }
        console.log(mates_info.length);
        return mates_info;
    }

    async componentDidMount() {
        const mates = await this.getMates();
        
        this.setState({
            mates: mates,
        });
    }

    async onAgeChange(val) {
        console.log(`Change age param to ${val}`);

        this.setState({ age: val }, async () => {
            const mates = await this.getMates();
            this.setState({
                mates: mates,
            });
        })
    }

    async onGenderChange(val) {
        console.log(`Change gender param to ${val}`);

        this.setState({ gender: val }, async () => {
            const mates = await this.getMates();
            this.setState({
                mates: mates,
            });
        })
    }

    async onMajorChange(val) {
        console.log(`Change major param to ${val}`);

        this.setState({ major: val }, async () => {
            const mates = await this.getMates();
            this.setState({
                mates: mates,
            });
        })
    }

    // async searchByName(event) {
    //     const text = event.target.value;
    //     const mates = await this.getMates();
    //     // filter the mates 
    //     const new_mates = mates.filter(mate => (mate.firstName + ' ' + mate.lastName).toLowerCase().indexOf(text) !== -1);
    //     this.setState({
    //         mates: new_mates,
    //     })

    // }

    async searchByName(event) {
        const text = event.target.value;
        console.log(text);

        const mates = await this.getMates(text);
        this.setState({
            mates: mates,
        })
    }

    render() {

        return (
            <Page> 
                <GatherSportNav />
                <div className='filters'>

                <Dropdown
                    color="lightBlue"
                    placement="bottom-start"
                    buttonText="Age"
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="dark"
                >
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onAgeChange('similar')}>
                        Similar 
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onAgeChange('nolimit')}>
                        No Limit
                    </DropdownItem>
                </Dropdown>

                <Dropdown
                    color="lightBlue"
                    placement="bottom-start"
                    buttonText="Gender"
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="dark"
                >
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onGenderChange('same')}>
                        Same 
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onGenderChange('diff')}>
                        Different
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onGenderChange('')}>
                        No Limit
                    </DropdownItem>
                </Dropdown>
                
                <Dropdown
                    color="lightBlue"
                    placement="bottom-start"
                    buttonText="Major"
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="dark"
                >
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onMajorChange('same')}>
                        Same 
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onMajorChange('diff')}>
                        Different
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onMajorChange('')}>
                        No Limit
                    </DropdownItem>
                </Dropdown>

                <Input
                    type="text"
                    color="lightBlue"
                    size="lg"
                    outline={false}
                    placeholder="Search by user name"
                    onChange={this.searchByName}
                />

                </div>

                <div className='mateSection'>
                {(!this.state.mates || this.state.mates.length === 0)?(<LeadText color="lightBlue">There is currently no recommendation based on your record. Please fill out more information or remove some filter for better recommendation.</LeadText>):(
                    this.state.mates.map(mate => (
                        <Card key={mate.email} className="mateCard">
                            <CardImage className="mateImage" alt="Card Image" src={fakeProfile} />
                            <CardBody>
                                <H6 color="gray">{mate.firstName} {mate.lastName}</H6>
                                <Paragraph color="blueGray">
                                {mate.gender==='M'?'Male':'Female'}
                                </Paragraph>
                            </CardBody>
                    </Card>
                    ))

                )}
                </div>

                 
            
            </Page>
        );
    }
}
export default Match;