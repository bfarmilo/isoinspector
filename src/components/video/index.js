import { h } from 'preact';
import style from './style';

const Video = (props) => {
    return (
        <video
            src={`data:video/${props.mimeType}; base64,${props.data}`}
            width={320}
            height={240}
            controls
            onError={props.handleEncrypted}
        />
    )
};

export default Video;

