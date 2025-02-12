const { getOperationName } = require('./utils');

const LIST = `
	query rooms($type: RoomTypes, $security: Security, $state: RoomStates, $filters: [Filter], $pagination: Pagination){
        rooms(type: $type, security: $security, state: $state, filters: $filters, pagination: $pagination) {
			list {
				roomNumber
				userID
				organizationID
				type
				created
				started
				ended
				displayName
				externalID
				agenda
				presenterID
				massive
				massiveStreaming
				urlExternalLiveStreaming
				canExternalLiveStreaming
				autoExternalLiveStreaming
				externalLiveStreaming
				locked
				enabledWaitingRoom
				webhook
				data
				attendees{
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
				url
				canRecord
				autoRecord
				recording
				state
				deletedAt
				view
				theme
				maxAttendees
				canScreenshot
				audioExtractFile
			}
			total
		}
	}
`;

const GET = `
	query room($roomNumber: String!){
		room(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
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
			url
			canRecord
			autoRecord
			recording
			state
			deletedAt
			view
			theme
			maxAttendees
			canScreenshot
			audioExtractFile
		}
	}
`;

const CREATE = `
	mutation createRoom($room: RoomInfo!, $organizationID: String!) {
		createRoom(room: $room, organizationID: $organizationID) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
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
			url
			canRecord
			autoRecord
			recording
			state
			roomNumber
			view
			theme
			maxAttendees
			canScreenshot
			audioExtractFile
		}
	}
`;

const UPDATE = `
	mutation updateRoom($room: UpdateRoomInfo!) {
		updateRoom(room: $room) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
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
			url
			canRecord
			autoRecord
			recording
			state
			roomNumber
			view
			theme
			maxAttendees
			canScreenshot
			audioExtractFile
		}
	}
`;

const DELETE = `
	mutation deleteRoom($roomNumber: String!) {
		deleteRoom(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			canRecord
			autoRecord
			recording
			deletedAt
		}
	}
`;

const START = `
	mutation startRoom($roomNumber: String!) {
		startRoom(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			canRecord
			autoRecord
			recording
			state
			canScreenshot
			audioExtractFile
		}
	}
`;

const CLOSE = `
	mutation closeRoom($roomNumber: String!) {
		closeRoom(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			canRecord
			autoRecord
			recording
			state
		}
	}
`;

const START_RECORDING = `
	mutation startRecording($roomNumber: String!) {
		startRecording(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			canRecord
			autoRecord
			recording
			audioExtractFile
		}
	}
`;

const STOP_RECORDING = `
	mutation stopRecording($roomNumber: String!) {
		stopRecording(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const START_MASSIVE_STREAMING = `
	mutation startMassiveStreaming($roomNumber: String!) {
		startMassiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const STOP_MASSIVE_STREAMING = `
	mutation stopMassiveStreaming($roomNumber: String!) {
		stopMassiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const START_EXTERNAL_STREAMING = `
	mutation startExternalLiveStreaming($roomNumber: String!) {
		startExternalLiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlExternalLiveStreaming
			canExternalLiveStreaming
			autoExternalLiveStreaming
			externalLiveStreaming
		}
	}
`;

const STOP_EXTERNAL_STREAMING = `
	mutation stopExternalLiveStreaming($roomNumber: String!) {
		stopExternalLiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlExternalLiveStreaming
			canExternalLiveStreaming
			autoExternalLiveStreaming
			externalLiveStreaming
		}
	}
`;

const ATTENDEES_URLS = `
	query attendeesURLs($roomNumber: String!){
		attendeesURLs(roomNumber: $roomNumber) {
			attendee{
				id
				role
				canShareScreen
				canBroadcast
				broadcasting
				canChat
				canMuteAudio
				canMuteVideo
				canMuteAudioAll
				canMuteVideoAll
				canShareFiles
				canSeeAttendeesList
				canRaiseHand
				mutedMic
				mutedCam
				displayName
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
			url
		}
	}
`;

const UPDATE_STATUS = `
	mutation updateRoomStatus($roomNumber: String!, $type: String!, $status: String!) {
		updateRoomStatus(roomNumber: $roomNumber, type: $type, status: $status) {
			userID
			organizationID
			type
			displayName
			status
		}
	}
`;


module.exports = class Rooms {
	#shutterFetch

	constructor(shutterFetch) {
		this.#shutterFetch = shutterFetch;
	}

	async list() {
		const variables = {};

		const response = await this.#shutterFetch({
			query: LIST,
			variables,
			operationName: getOperationName(LIST)
		});

		if (response.errors) throw response.errors;

		return response.data.rooms.list;
	}

	async get({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: GET,
			variables,
			operationName: getOperationName(GET)
		});

		if (response.errors) throw response.errors;

		return response.data.room;
	}

	async create({ room, organizationID }) {
		const variables = { room, organizationID };

		const response = await this.#shutterFetch({
			query: CREATE,
			variables,
			operationName: getOperationName(CREATE)
		});

		if (response.errors) throw response.errors;

		return response.data.createRoom;
	}

	async update({ room }) {
		const variables = { room };

		const response = await this.#shutterFetch({
			query: UPDATE,
			variables,
			operationName: getOperationName(UPDATE)
		});

		if (response.errors) throw response.errors;

		return response.data.updateRoom;
	}

	async delete({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: DELETE,
			variables,
			operationName: getOperationName(DELETE)
		});

		if (response.errors) throw response.errors;

		return response.data.deleteRoom;
	}

	async start({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: START,
			variables,
			operationName: getOperationName(START)
		});

		if (response.errors) throw response.errors;

		return response.data.startRoom;
	}

	async close({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: CLOSE,
			variables,
			operationName: getOperationName(CLOSE)
		});

		if (response.errors) throw response.errors;

		return response.data.closeRoom;
	}

	async startRecording({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: START_RECORDING,
			variables,
			operationName: getOperationName(START_RECORDING)
		});

		if (response.errors) throw response.errors;

		return response.data.startRecording;
	}

	async stopRecording({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: STOP_RECORDING,
			variables,
			operationName: getOperationName(STOP_RECORDING)
		});

		if (response.errors) throw response.errors;

		return response.data.stopRecording;
	}

	async startMassiveStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: START_MASSIVE_STREAMING,
			variables,
			operationName: getOperationName(START_MASSIVE_STREAMING)
		});

		if (response.errors) throw response.errors;

		return response.data.startLiveStreaming;
	}

	async stopMassiveStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: STOP_MASSIVE_STREAMING,
			variables,
			operationName: getOperationName(STOP_MASSIVE_STREAMING)
		});

		if (response.errors) throw response.errors;

		return response.data.stopLiveStreaming;
	}

	async startExternalStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: START_EXTERNAL_STREAMING,
			variables,
			operationName: getOperationName(START_EXTERNAL_STREAMING)
		});

		if (response.errors) throw response.errors;

		return response.data.startExternalLiveStreaming;
	}

	async stopExternalStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: STOP_EXTERNAL_STREAMING,
			variables,
			operationName: getOperationName(STOP_EXTERNAL_STREAMING)
		});

		if (response.errors) throw response.errors;

		return response.data.stopExternalLiveStreaming;
	}

	async attendeesUrls({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: ATTENDEES_URLS,
			variables,
			operationName: getOperationName(ATTENDEES_URLS)
		});

		if (response.errors) throw response.errors;

		return response.data.attendeesURLs;
	}

	async updateStatus({ roomNumber, type, status }) {
		const variables = { roomNumber, type, status };

		const response = await this.#shutterFetch({
			query: UPDATE_STATUS,
			variables,
			operationName: getOperationName(UPDATE_STATUS)
		});

		if (response.errors) throw response.errors;

		return response.data.updateRoomStatus;
	}
};
