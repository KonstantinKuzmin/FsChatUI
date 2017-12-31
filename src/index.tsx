import * as React from 'react';
import * as ReactDom from 'react-dom';

// App styles
import './styles/app.scss';

type UserAvatarProps = {
	photoUrl?: string;
	iconCssClass?: string;
};
const UserAvatar: React.StatelessComponent<UserAvatarProps> = (props) => {
	if (props.iconCssClass) return (
		<div className="fs-avatar"><i className={props.iconCssClass} /></div>
	)
	else {
		const style: React.CSSProperties = {
			backgroundImage: `url('${props.photoUrl}')`,
		};
		return <div className="fs-avatar" style={style} />
	}
}

type ChannelProps = {
	name: string;
	description: string;
	active?: boolean;
};
const Channel: React.StatelessComponent<ChannelProps> = (props) => (
	<button className={`btn fs-channel${props.active && ' selected' || ''}`}>
		{props.name}
		<span>{props.description}</span>
	</button>
)

class Menu extends React.Component {

	state = {
		open: false,
	}

	onAddClick = () => {
		this.setState({ open: !this.state.open });
	}

	public render() {
		return [
			<div className="fs-user">
				<UserAvatar photoUrl="https://pbs.twimg.com/profile_images/2191150324/Avatar_Shepard_400x400.jpg" />
				<h3>John Shepard</h3>
				<span>The first human Spectre</span>
				<button className="btn" title="Logout"><i className="mdi mdi-logout-variant" /></button>
			</div>,
			<h2>My Channels<button className="btn" title="Create New" onClick={this.onAddClick}><i className={`mdi mdi-${this.state.open && 'close' || 'plus'}`} /></button></h2>,
			<input type="text" className={`fs-new-channel${this.state.open && ' open' || ''}`} placeholder="Type a channel name here..." />,
			<Channel name="Harvest" description="The chances of surviving are... slim" active />,
			<h2>All Channels<button className="btn" title="Search"><i className="mdi mdi-magnify" /></button></h2>,
			<Channel name="Demo" description="Channel for testing purposes. Notice the bots are always ready to keep conversation" />,
		];
	}
}

class ChatInfo extends React.Component {
	public render() {
		return (
			<div className="fs-chat-info">
				<h1>Harvest</h1>
				<span>The chances of surviving are... slim</span>
				<button className="btn" title="Leave"><i className="mdi mdi-door-closed mdi-18px" /></button>
			</div>
		);
	}
}

type Message = {
	content: string;
	userName: string;
	avatar: UserAvatarProps;
	date: string;
	userMessage?: boolean;
}

class MessageList extends React.Component<any> {
	public render() {
		const { messages } = this.props;
		return (
			<div className="fs-messages">
				{messages.map((msg: Message) => (
					<div className={`fs-message${msg.userMessage && ' user' || ''}`}>
						<div>
							<p>{msg.content}</p>
							<h5><span className="user">{msg.userName}</span><span className="time">{msg.date}</span></h5>
						</div>
						<UserAvatar {...msg.avatar} />
					</div>
				))}
			</div>
		);
	}
}

class MessageInput extends React.Component {
	public render() {
		return (
			<div className="fs-message-input">
				<input type="text" placeholder="Type your message here..." />
				<button className="btn"><i className="mdi mdi-send mdi-24px" /></button>
			</div>
		);
	}
}

const demoMessages: Message[] = [
	{ content: 'The cycle has ended. Now it\'s time for you to die!', userName: 'Reapers', date: '2186 CE', avatar: { photoUrl: "https://vignette.wikia.nocookie.net/masseffect/images/e/ec/Codex_Banshee.png/revision/latest?cb=20120320182448" } },
	{ content: 'Not on my watch!', userName: 'John Shepard', date: '2186 CE', userMessage: true, avatar: { photoUrl: "https://pbs.twimg.com/profile_images/2191150324/Avatar_Shepard_400x400.jpg" } },
	{ content: 'Yeah!', userName: 'Kaidan Alenko', date: '2186 CE', avatar: { photoUrl: "https://static.giantbomb.com/uploads/square_small/0/1366/1775328-kaidan.jpg" } },
	{ content: 'Let\'s kill some bad guys!', userName: 'Garrus Vakarian', date: '2186 CE', avatar: { photoUrl: "https://vignette.wikia.nocookie.net/masseffect/images/3/36/Garrus_Character_Shot.png/revision/latest?cb=20100323054855" } }
]

export class Chat extends React.Component {

	public render() {
		return (
			<div className="container">
				<div className="col-md-4 fs-menu">
					<Menu />
				</div>
				<div className="col-xs-12 col-md-8 fs-chat">
					<ChatInfo />
					<div className="fs-splitter" />
					<MessageList messages={demoMessages} />
					<div className="fs-splitter" />
					<MessageInput />
				</div>
			</div>
		)
	}

}


ReactDom.render(<Chat />, document.getElementById('root'));
