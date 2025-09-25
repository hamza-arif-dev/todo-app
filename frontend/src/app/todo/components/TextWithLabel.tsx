export type TextWithLabelProps = {
  label: string;
  text: string;
}
export const TextWithLabel = (props: TextWithLabelProps) => {
  const { label, text } = props;

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', color: '#a1a1a1' }}>
    <div style={{ fontWeight: '200' }}>{label}</div>
    <div style={{
      fontWeight: '600',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '25ch'
    }}>{text}</div>
  </div>;
};