import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import H3 from '@material-tailwind/react/Heading3';
import Icon from '@material-tailwind/react/Icon';
import ProfilePicture from 'assets/img/UIUC.jpg';
import {Component} from "react";
import axios from "axios";
import InputIcon from "@material-tailwind/react/InputIcon";

const infoUrl = 'http://localhost:8080/profile';

async function getContInfo(id) {
    const userId = id;
    const prof_info = await axios.get(infoUrl +'/' + userId);
    return prof_info.data;
}

async function updContInfo(lstNm, gd, ag, ph, loc, typ, id) {
    const lastName = lstNm;
    const gender = gd;
    const age = ag;
    const phone = ph;
    const location = loc;
    const type = typ;
    const userId = id;
    const prof_info = await axios.put(infoUrl +'/updateInfo/' + lastName + '/' + gender + '/' + age + '/' + phone + '/' + location + '/' + type + '/' + userId);
    return prof_info.data;
}

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            lstNm: "",
            gender: "",
            gd: "",
            age: 0,
            ag: "",
            phone: "",
            ph: "",
            location: "",
            loc: "",
            email: "",
            type: "",
            typ: "",
            id: "24",
        }
    }

    async getCnInfo(id) {
        const info = await getContInfo(id);
        this.setState({
            firstName: info[0].firstName,
            lastName: info[0].lastName,
            gender: info[0].gender,
            age: info[0].age,
            phone: info[0].phone,
            location: info[0].location,
            email: info[0].email,
            type: info[0].type
        });
    }

    async updCnInfo(lstNm, gd, ag, ph, loc, typ, id) {
        await updContInfo(lstNm, gd, ag, ph, loc, typ, id);
        this.setState({
            lstNm: lstNm,
            gd: gd,
            ag: ag,
            ph: ph,
            loc: loc,
            typ: typ
        });
    }

    async updInfo(lstNm, gd, ag, ph, loc, typ, id) {
        await this.updCnInfo(lstNm, gd, ag, ph, loc, typ, id);
        this.setState({
            lastName: lstNm,
            gender: gd,
            age: ag,
            phone: ph,
            location: loc,
            type: typ
        });
    }

     async componentDidMount() {
        await this.getCnInfo(this.state.id);
     }

    render() {
        return (
            <section className="relative py-16 bg-gray-100">
                <div className="container max-w-7xl px-4 mx-auto">
                    <div
                        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <div className="w-60 -mt-60">
                                            <Image
                                                src={ProfilePicture}
                                                alt="Profile picture"
                                                raised
                                                rounded
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="w-full lg:w-4/12 px-4 lg:order-3 lg:self-center flex justify-center mt-10 lg:justify-end lg:mt-0">
                                    <Button
                                        color="lightBlue"
                                        ripple="light"
                                        onClick=
                                            {async () => {
                                            await this.updInfo(this.state.lstNm, this.state.gd, this.state.ag, this.state.ph, this.state.loc, this.state.typ, this.state.id);
                                        }}>
                                        Update Info
                                    </Button>
                                </div>

                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                </div>
                            </div>

                            <div className="text-center my-8">
                                <H3 color="blue">{this.state.firstName}</H3>
                                <H3 color="blue">{this.state.lastName}</H3>
                                <div className="mt-0 mb-2 text-orange-500 font-medium flex items-center justify-center gap-2">
                                    <InputIcon
                                        iconName="face"
                                        type="LastName"
                                        color="black"
                                        placeholder="LastName"
                                        onChange={event => this.setState({lstNm: event.target.value})}
                                    />
                                </div>
                                <div
                                    className="mt-0 mb-2 text-orange-500 font-medium flex items-center justify-center gap-2">
                                    <Icon name="location_city" size="xl"/>
                                    {this.state.location}
                                </div>
                                <div className="mt-0 mb-2 text-orange-500 font-medium flex items-center justify-center gap-2">
                                    <InputIcon
                                        iconName="location_city"
                                        type="location"
                                        color="black"
                                        placeholder="location"
                                        onChange={event => this.setState({loc: event.target.value})}
                                    />
                                </div>
                                <div className="mb-2 text-black-700 flex items-center justify-center gap-2">
                                    <Icon name="security" size="xl"/>
                                    UserId: {this.state.id}
                                </div>
                                <div className="mb-2 text-black-700 flex items-center justify-center gap-2">
                                    <Icon name="email" size="xl"/>
                                    {this.state.email}
                                </div>
                                <div className="mb-2 text-black-700 flex items-center justify-center gap-2">
                                    <Icon name="phone" size="xl"/>
                                    {this.state.phone}
                                </div>
                                <div className="mt-0 mb-2 text-orange-500 font-medium flex items-center justify-center gap-2">
                                    <InputIcon
                                        iconName="phone"
                                        type="phone"
                                        color="black"
                                        placeholder="phone"
                                        onChange={event => this.setState({ph: event.target.value})}
                                    />
                                </div>
                                <div className="mb-2 text-black-700 flex items-center justify-center gap-2">
                                    <Icon name="perm_identity" size="xl"/>
                                    {this.state.gender==="F"?"Female":"Male"}
                                </div>
                                <div className="mt-0 mb-2 text-orange-500 font-medium flex items-center justify-center gap-2">
                                    <InputIcon
                                        iconName="perm_identity"
                                        type="gender"
                                        color="black"
                                        placeholder="gender"
                                        onChange={event => this.setState({gd: event.target.value})}
                                    />
                                </div>
                                <div className="mb-2 text-black-700 flex items-center justify-center gap-2">
                                    <Icon name="assignment_ind" size="xl"/>
                                    {this.state.type==="S"?"Student":"Teacher"}
                                </div>
                                <div className="mt-0 mb-2 text-orange-500 font-medium flex items-center justify-center gap-2">
                                    <InputIcon
                                        iconName="assignment_ind"
                                        type="user type"
                                        color="black"
                                        placeholder="user type"
                                        onChange={event => this.setState({typ: event.target.value})}
                                    />
                                </div>
                                <div className="mb-2 text-black-700 flex items-center justify-center gap-2">
                                    <Icon name="cake" size="xl"/>
                                    {this.state.age}
                                </div>
                                <div className="mt-0 mb-2 text-orange-500 font-medium flex items-center justify-center gap-2">
                                    <InputIcon
                                        iconName="cake"
                                        type="age"
                                        color="black"
                                        placeholder="age"
                                        onChange={event => this.setState({ag: event.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Content;