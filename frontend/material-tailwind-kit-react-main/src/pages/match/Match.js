import { Component } from 'react';
import Card from '@material-tailwind/react/Card';
import GatherSportNav from 'components/GatherSportNav';
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from '@material-tailwind/react/CardBody';
import Paragraph from '@material-tailwind/react/Paragraph';
import H6 from "@material-tailwind/react/Heading6";
import fakeProfile from 'assets/img/profile_default.jpeg';
import Page from 'components/login/Page';
import axios from 'axios';
import './styles.match.css';

const baseURL = 'http://localhost:8080/match/mates';
const infoURL = 'http://localhost:8080/profile';

async function getMates(count=15) {
    // TODO: change id to props later
    const id = '24';
    const mate_ids = await axios.get(baseURL, 
        {
        params: {
            id: id,
        }
    });
    const mates_info = [];
    
    for (const mate_id of mate_ids.data) {
        var result = await axios.get(infoURL+'/'+mate_id);
        mates_info.push(result.data[0]);
    }

    return mates_info;
}

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mates: [],
        }
    }

    async componentDidMount() {
        const mates = await getMates();
        
        this.setState({
            mates: mates,
        });
    }
    render() {
        console.log(this.state.mates);
        if (!this.state.mates || this.state.mates.length === 0) {
            return <div> Loading...</div>
        }

        return (
            <Page> 
                <GatherSportNav />
                 <div className='mateSection'>
                    {/* className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4" */}
                    {this.state.mates.map(mate => (
                        <Card key={mate.email} className="mateCard">
                            <CardImage className="mateImage" alt="Card Image" src={fakeProfile} />
                            <CardBody>
                                <H6 color="gray">{mate.firstName} {mate.lastName}</H6>
                                <Paragraph color="blueGray">
                                {mate.gender==='M'?'Male':'Female'}
                                </Paragraph>
                            </CardBody>
                    </Card>
                    ))} 

                </div>
            
            </Page>
        );
    }
}
export default Match;