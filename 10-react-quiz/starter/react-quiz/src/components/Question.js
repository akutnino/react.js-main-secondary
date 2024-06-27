import Options from './Options';

export default function Question(props) {
	const { questionObject } = props;

	return (
		<div>
			<h4>{questionObject.question}</h4>

			<Options questionObject={questionObject} />
		</div>
	);
}
