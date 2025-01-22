function Header(){
    return (
        <div className="header">
            <h1 className="headerTitle">Mordern Murmur</h1>
            <a href={import.meta.env.CREATE_SPACE_URL}>Creater Space</a>
        </div>
    )
}

export default Header;