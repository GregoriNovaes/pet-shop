type Props = {
  title: string;
};

const Component = ({}: Props) => {
  return (
    <>
      <h2>Component</h2>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <h2>Rocketseat 🚀</h2>
      <Component title={2} />
    </div>
  );
}
