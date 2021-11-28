import Card from '@material-tailwind/react/Card';
import { Component } from 'react';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import Button from "@material-tailwind/react/Button"
import LeadText from '@material-tailwind/react/LeadText';
import Page from 'components/login/Page';
import Teamwork from 'assets/img/table-tennis-icon.svg';
import GatherSportNav from 'components/GatherSportNav';
import Rating from '@mui/material/Rating';
import axios from 'axios';


const courseURL = 'http://localhost:8080/course/';


class CourseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            description: '',
            sportId: '',
            rating: '',
            teacherId:'',
            courseId: this.props.match.params.id
        }
        this.register = this.register.bind(this);
        this.updateRegisterState = this.updateRegisterState.bind(this);
    }
    async getCouseInfo() {
        
        var course = await axios.get(courseURL + this.state.courseId);
        return course.data;
    }

    async componentDidMount() {
        var course = await this.getCouseInfo();
        // make description a list of paragraphs
        var description = course.description.split(/\r\n/);
        console.log(description);

        this.setState({
            name: course.name,
            description: description,
            rating: course.rating,
            sportId: course.sportId,
            teacherId: course.teacherId,
            registered: false
        })
        await this.updateRegisterState();
    }
    async updateRegisterState() {
        // TODO
        var studentId = 24;
        var count = (await axios.get(courseURL + 'fetch/' + this.state.courseId + '/' + studentId)).data;
        var registered = count >= 1
        this.setState({
            registered: registered
        })
    }

    async register(event) {
        // TODO
        var studentId = 24;
        if (!this.state.registered) {
            await axios.post(courseURL + 'enroll/' + this.state.courseId + '/' + studentId);
            await this.updateRegisterState();
        }
    }

    render() {
        
        if (this.state.description.length === 0) {
            return (
                <Page> 
                    <GatherSportNav />
                    Loading...
                </Page>
            )
        }
        return (
            <Page>
                <GatherSportNav />
    
                    <div className="flex flex-wrap items-center mt-10 mb-10">
                        <div className="w-full md:w-5/12 px-4 mx-auto">
                            <div className="text-blue-gray-800 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <Icon name="people" size="3xl" />
                            </div>
                            
                            <H4 color="gray">{this.state.name}</H4>
                            {this.state.description.map(desc => (
                                <LeadText color="blueGray">
                                {desc}
                                </LeadText>
                            ))}
                        
                        </div>
    
                        <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
                            <Card>
                                <CardImage alt="Card Image" src={Teamwork} />
                                <CardBody>
                                
                                    <Rating name="read-only" value={this.state.rating} readOnly precision={0.1}/> {this.state.rating}
                                    {this.state.registered?<Button
                                        className="register"
                                        color="grey"
                                        buttonType="link"
                                        size="lg"
                                        rounded={false}
                                        block={false}
                                        iconOnly={false}
                                        ripple="dark"
                                    >
                                        Registered<Icon name="favorite" />
                                    </Button>:<Button
                                        className="register"
                                        color="lightBlue"
                                        buttonType="link"
                                        size="lg"
                                        rounded={false}
                                        block={false}
                                        iconOnly={false}
                                        ripple="dark"
                                        onClick={this.register}
                                    >
                                        Register<Icon name="favorite" />
                                    </Button>}
                                    
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </Page>
        );
    }
}

export default CourseInfo;