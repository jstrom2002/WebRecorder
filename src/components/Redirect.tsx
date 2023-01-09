export default function Redirect(props: any) {
  window.location = props.loc;
  return <section>Redirecting...</section>;
}
