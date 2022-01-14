import { h } from 'preact';
import style from './style';

const Video = (props) => {
    // if it's a bif, props.data is an array of {timestamp, src}
    if (props.mimeType === 'bif') return (
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '60px' }}>
            {props.data.map(trickImage => (<div key={trickImage.timestamp} style={{ margin: '0 5px' }}>
                <img src={trickImage.src} />
                <div style={{ justifyContent: 'center' }}>Time={trickImage.timestamp}s</div>
            </div>)
            )}
        </div>
    );
    return (
        <video
            src={`data:video/${props.mimeType}; base64,${props.data}`}
            width={320}
            height={240}
            controls
            onError={props.handleEncrypted}
        />
    );
};

export default Video;

