function Anchor({ href = "#", target = "_self", children, estilos = "cursor-pointer" }) {
  return (
    <a className={estilos} href={href} target={target}>{children}</a>
  )
}

export { Anchor }