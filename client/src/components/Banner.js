import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function Banner({model, setCurrentPage, search, logout}) {
	// let questions_toggle = (model.Pages[model.current_page] === model.Pages.Display_Questions && !model.fromSearch && !model.fromTags) ? 'highlight' : 'nohighlight'
	// questions_toggle = 'banner_element link ' + questions_toggle;

	// let tags_toggle = (model.Pages[model.current_page] === model.Pages.Tags) ? 'highlight' : 'nohighlight'
	// tags_toggle = 'banner_element link ' + tags_toggle;
	
	return (
		<Navbar fixed="top" bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home">FakeStackOverflow</Navbar.Brand>
				<Nav className="me-auto">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Nav.Link onClick={() => setCurrentPage(model.Pages.Display_Questions)}>Questions</Nav.Link>
					<Nav.Link onClick={() => setCurrentPage(model.Pages.Tags)}>Tags</Nav.Link>
					{
						(model.current_user !== '')
						?
							<>
								<Nav.Link onClick={() => setCurrentPage(model.Pages.New_Question)}></Nav.Link>
								<Nav.Link onClick={() => setCurrentPage(model.Pages.Profile)} variant="link" id="goto_profile">{model.current_user.username}</Nav.Link>
								<Nav.Link onClick={() => logout()} variant="danger">Logout</Nav.Link>
								<Button onClick={() => setCurrentPage(model.Pages.New_Question)}>Ask A Question</Button>
							</>
							: ''
					}
					{
						(model.current_user === '') 
						? <Button onClick={() => setCurrentPage(model.Pages.Login)} variant="success">Log In</Button>
						: ''

					}
				</Nav>
				<Nav>
					<Form className="d-flex">
						<FormControl
							onKeyPress={search}
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
						/>
					</Form>

				</Nav>
			</Container>
		</Navbar>
		// <div>
		// 	<div id="banner" className="banner">
		// 		<a className={questions_toggle} id="questions_link" href="/#" onClick={() => setCurrentPage(model.Pages.Display_Questions)}>
		// 			<div>Questions</div>
		// 		</a>

		// 		<a className={tags_toggle} id="tags_link" href="/#" onClick={() => setCurrentPage(model.Pages.Tags)}>
		// 			<div>Tags</div>
		// 		</a>
		// 		<div className="banner_element"> <b>Fake Stack Overflow</b></div>
		// 		{
		// 			(model.current_user !== '')
		// 			? 
		// 			<>
		// 				<a className="banner_element nohighlight" href="/#" onClick={() => setCurrentPage(model.Pages.Profile)}><div id="profile_link">{model.current_user.username}</div></a>
    	// 			<a className="banner_element nohighlight" href="/#" onClick={() => logout()}>Logout</a>
		// 				<a className="banner_element nohighlight" href="/#" onClick={() => setCurrentPage(model.Pages.New_Question)}>Ask a question</a>
		// 			</>
		// 			: ''
		// 		}
		// 		<div className="banner_element">
		// 			<input id="search" type="text" placeholder="Search ..." onKeyPress={search}></input>
		// 		</div>
		// 	</div>
		// </div>
	)
}

export default Banner