import React, { PropTypes } from 'react';
import Form from '../containers/form.jsx';

const Tweet = ({ onAddForm, onRemove, onChange, postTweets, forms, person, notifications }) =>
	<div className="tweet-page">
		<div className={notifications.type === 'ongoing' ? 'disabled' : ''}>
			<section className="container">
				<header>
					<aside>
						<picture className="left">
							<img alt="profile" src={person.photos ? person.photos[0].value : ''} />
						</picture>
						<div className="right">
							<span className="fullname">
								{person.displayName || 'not set'}
							</span>
							<span className="username">
								@{person.username || 'not set'}
							</span>
						</div>
					</aside>
					<button className="button post-btn" disabled={forms.length < 1} onClick={() => postTweets(forms)} type="submit">
						Post
					</button>
				</header>
				{notifications
					? <div className="notifications">
						<span className={notifications.type}>
							{notifications.message}
						</span>
					</div>
					: null}
				<div className="tweet-forms">
					<div className={forms.length <= 1 ? 'hide-remove-btn' : ''}>
						{forms.map((each, index) =>
							<Form
								key={each.id}
								id={each.id}
								index={index}
								formCount={forms.length}
								status={each.status}
								text={each.text}
								onChange={onChange}
								onRemove={onRemove}
							/>
						)}
					</div>
					<div className="form-control">
						<button onClick={onAddForm} className="button thread-btn">
							+ Thread
						</button>
					</div>
				</div>
			</section>
		</div>
	</div>;

Tweet.propTypes = {
	postTweets: PropTypes.func.isRequired,
	onAddForm: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	forms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	person: PropTypes.object.isRequired,
	notifications: PropTypes.object.isRequired
};

export default Tweet;
