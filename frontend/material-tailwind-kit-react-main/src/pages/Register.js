import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import DefaultNavbar from 'components/DefaultNavbar';
import SimpleFooter from 'components/SimpleFooter';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import axios from "axios";
import {Component} from "react";

const infoUrl = 'http://localhost:8080/register/saveUser';

async function getRegisInfo(fstName, eml, pwd) {
    const firstName = fstName;
    const email = eml;
    const password = pwd;
    console.log(`${firstName} ${email} ${password}`);
    const regis_info = await axios.post(infoUrl +'/' + firstName + '/' + email + '/' + password);
    return regis_info.data;
}
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: "",
            firstName: "",
            email: "",
            password: "",
        }
    }

    async getInfo(firstName, email, password) {
        const info = await getRegisInfo(firstName, email, password);
        this.setState({
            info: info
        });
    }

    render() {
        return (
            <Page>
                <DefaultNavbar/>
                <Container>
                    <div className="mb-8 px-4" style={{fontSize: 20, textAlign: "center"}}>
                        {this.state.info !== "user with such email already exists"?'Welcome to GATHERSPORTS':'User With This Email Already Exists'}
                    </div>
                    <Card>
                        <CardHeader color="lightBlue">
                            <H5 color="white" style={{marginBottom: 0}}>
                                Register
                            </H5>
                        </CardHeader>

                        <CardBody>
                            <div className="mb-10 px-4">
                                <InputIcon
                                    type="text"
                                    color="lightBlue"
                                    placeholder="FirstName"
                                    iconName="account_circle"
                                    onChange={event => this.setState({firstName: event.target.value})}
                                />
                            </div>
                            <div className="mb-10 px-4">
                                <InputIcon
                                    type="email"
                                    color="lightBlue"
                                    placeholder="Email Address"
                                    iconName="email"
                                    onChange={event => this.setState({email: event.target.value})}
                                />
                            </div>
                            <div className="mb-4 px-4">
                                <InputIcon
                                    type="password"
                                    color="lightBlue"
                                    placeholder="Password"
                                    iconName="lock"
                                    onChange={event => this.setState({password: event.target.value})}
                                />
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="flex justify-center">
                                <Button
                                    color="lightBlue"
                                    buttonType="link"
                                    size="lg"
                                    ripple="dark"
                                    onClick={async () => {
                                        await this.getInfo(this.state.firstName, this.state.email, this.state.password);
                                    }}
                                >
                                    Register
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Container>
                <SimpleFooter/>
            </Page>
        );
    }
}

export default Register;