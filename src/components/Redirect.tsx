export default function Redirect(props: any) {
  window.location = props.loc;
  return (
    <section onLoad={() => console.log("redirecting...")}>
      Redirecting...
    </section>
  );
}
