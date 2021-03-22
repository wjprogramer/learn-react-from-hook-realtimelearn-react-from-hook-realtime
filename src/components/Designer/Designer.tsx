import styled from '@emotion/styled';

const Link = ({text, url}: {text: string, url: string}) => {
  return(
    <a href={url} target="_blank" rel="noreferrer noopener">{text}</a>
  );
}

const BottomRight = styled.div`
  color: white;
  position: absolute;
  padding: 16px;
  bottom: 0;
  right: 0;
`

interface DesignerProps {
  name: string,
  link: string,
  workLink: string,
}

const Designer = (props: DesignerProps) => {
  const { name, link, workLink } = props;

  return (
    <BottomRight>
      Designed by {" "}
      <Link text={name} url={link} /> on {" "}
      <Link text="Dribble" url={workLink} />
    </BottomRight>
  )
}

export default Designer;