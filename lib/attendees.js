const { getOperationName } = require('./utils');

const LIST = `
	query attendees($roomNumber: String!){
		attendees(roomNumber: $roomNumber) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const GET = `
	query attendee($roomNumber: String!, $attendeeID: String!){
		attendee(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const GET_URL = `
	query attendeeURL($roomNumber: String!, $attendeeID: String!){
		attendeeURL(roomNumber: $roomNumber, attendeeID: $attendeeID)
	}
`;

const CREATE = `
	mutation addAttendee($roomNumber: String!, $attendee: AttendeeInfo!) {
		addAttendee(roomNumber: $roomNumber, attendee: $attendee) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const UPDATE = `
	mutation updateAttendee($roomNumber: String!, $attendee: UpdateAttendeeInfo!) {
		updateAttendee(roomNumber: $roomNumber, attendee: $attendee) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const DELETE = `
	mutation deleteAttendee($roomNumber: String!, $attendeeID: String!) {
		deleteAttendee(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const MUTE = `
	mutation muteAttendee($roomNumber: String!, $attendeeID: String!, $type: String!) {
		muteAttendee(roomNumber: $roomNumber, attendeeID: $attendeeID, type: $type) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const RAISE_HAND = `
	mutation raiseHand($roomNumber: String!, $attendeeID: String!) {
		raiseHand(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const LOWER_HAND = `
	mutation lowerHand($roomNumber: String!, $attendeeID: String!) {
		lowerHand(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const GRANT_WORD = `
	mutation grantWord($roomNumber: String!, $attendeeID: String!) {
		grantWord(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const DENY_WORD = `
	mutation denyWord($roomNumber: String!, $attendeeID: String!) {
		denyWord(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;


module.exports = class Attendees {
	#shutterFetch

	constructor(shutterFetch) {
		this.#shutterFetch = shutterFetch;
	}

	async list({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: LIST,
			variables,
			operationName: getOperationName(LIST)
		});

		if (response.errors) throw response.errors;

		return response.data.attendees;
	}

	async get({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.#shutterFetch({
			query: GET,
			variables,
			operationName: getOperationName(GET)
		});

		if (response.errors) throw response.errors;

		return response.data.attendee;
	}

	async getURL({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.#shutterFetch({
			query: GET_URL,
			variables,
			operationName: getOperationName(GET_URL)
		});

		if (response.errors) throw response.errors;

		return response.data.attendeeURL;
	}

	async create({ roomNumber, attendee }) {
		const variables = { roomNumber, attendee };

		const response = await this.#shutterFetch({
			query: CREATE,
			variables,
			operationName: getOperationName(CREATE)
		});

		if (response.errors) throw response.errors;

		return response.data.addAttendee;
	}

	async update({ roomNumber, attendee }) {
		const variables = { roomNumber, attendee };

		const response = await this.#shutterFetch({
			query: UPDATE,
			variables,
			operationName: getOperationName(UPDATE)
		});

		if (response.errors) throw response.errors;

		return response.data.updateAttendee;
	}

	async delete({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.#shutterFetch({
			query: DELETE,
			variables,
			operationName: getOperationName(DELETE)
		});

		if (response.errors) throw response.errors;

		return response.data.deleteAttendee;
	}

	async mute({ roomNumber, id, type }) {
		const variables = { roomNumber, attendeeID: id, type };

		const response = await this.#shutterFetch({
			query: MUTE,
			variables,
			operationName: getOperationName(MUTE)
		});

		if (response.errors) throw response.errors;

		return response.data.muteAttendee;
	}

	async raiseHand({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.#shutterFetch({
			query: RAISE_HAND,
			variables,
			operationName: getOperationName(RAISE_HAND)
		});

		if (response.errors) throw response.errors;

		return response.data.raiseHand;
	}

	async lowerHand({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.#shutterFetch({
			query: LOWER_HAND,
			variables,
			operationName: getOperationName(LOWER_HAND)
		});

		if (response.errors) throw response.errors;

		return response.data.lowerHand;
	}

	async grantWord({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.#shutterFetch({
			query: GRANT_WORD,
			variables,
			operationName: getOperationName(GRANT_WORD)
		});

		if (response.errors) throw response.errors;

		return response.data.grantWord;
	}

	async denyWord({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.#shutterFetch({
			query: DENY_WORD,
			variables,
			operationName: getOperationName(DENY_WORD)
		});

		if (response.errors) throw response.errors;

		return response.data.denyWord;
	}
};
