const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '16px'
};

const starContainerStyle = {
	display: 'flex',
	gap: '4px'
};

const textStyle = {
	lineHeight: '1',
	margin: '0'
};

export default function StarRating(props) {
	const { maxRating = 5 } = props;

	return (
		<div style={containerStyle}>
			<div style={starContainerStyle}>
				{Array.from(Array(maxRating)).map((val, index) => (
					<span key={index}>S{index + 1}</span>
				))}
			</div>
			<p style={textStyle}>10</p>
		</div>
	);
}
