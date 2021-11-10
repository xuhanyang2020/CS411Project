import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Checkbox from '@material-tailwind/react/Checkbox';
import Button from '@material-tailwind/react/Button';
import SimpleFooter from 'components/SimpleFooter';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import axios from "axios";
import {Component} from "react";
import {Link} from "react-router-dom";

const infoUrl = 'http://localhost:8080/login';

async function getUserId(eml, pwd) {
    // TODO: change email, password to props later
    const email = eml;
    const password = pwd;
    const user_info = await axios.get(infoUrl +'/' + email + '/' + password);
    return user_info.data;
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: "",
            email: "",
            password: "",
        }
    }

    async getId(email, pwd) {
        const info = await getUserId(email, pwd);

        this.setState({
            info: info
        });
    }

    render() {
        const ConditionalLink = ({ children, to, condition }) => (!condition && to)
            ? <Link to={'/profile'}>{children}</Link>
            : <>{children}</>;
        return (
            <Page>
                <Container>
                    <div className="mb-8 px-4" style={{fontSize: 20, textAlign: "center"}}>
                            {this.state.info !== "email or password is wrong"?'':'Email or Password is wrong'}
                    </div>
                    <Card>
                        <CardHeader color="lightBlue">
                            <H5 color="white" style={{marginBottom: 0}}>
                                Login
                            </H5>
                        </CardHeader>

                        <CardBody>
                            <div className="mb-12 px-4 bg-bb">
                                <InputIcon
                                    type="email"
                                    color="lightBlue"
                                    placeholder="Email Address"
                                    iconName="email"
                                    onChange={event => this.setState({email: event.target.value})}
                                />
                            </div>
                            <div className="mb-8 px-4">
                                <InputIcon
                                    type="password"
                                    color="lightBlue"
                                    placeholder="Password"
                                    iconName="lock"
                                    onChange={event => this.setState({password: event.target.value})}
                                />
                            </div>
                            <div className="mb-4 px-4">
                                <Checkbox
                                    color="lightBlue"
                                    text="Remember Me"
                                    id="remember"
                                />
                            </div>
                        </CardBody>

                        <CardFooter>
                            <div className="flex justify-center bg-bb">
                            <ConditionalLink to="/profile" condition={this.state.info !== "email or password is wrong"}><Button
                                    color="lightBlue"
                                    buttonType="link"
                                    size="lg"
                                    ripple="dark"
                                    onClick={async () => {
                                        await this.getId(this.state.email, this.state.password);
                                    }}
                                >
                                    Get Started
                                </Button></ConditionalLink>
                            </div>
                        </CardFooter>

                    </Card>
                </Container>
                <SimpleFooter/>
            </Page>
        );
    }
}

export default Login;
