import Options from './Options';

export default function Question(props) {
	const { questionObject } = props;
	const { correctOption, id, options, question, points } = questionObject;

	return (
		<div>
			<h4>{question}</h4>

			<Options options={options} />
		</div>
	);
}
