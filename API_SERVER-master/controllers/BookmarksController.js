const Repository = require('../models/Repository');
const url = require('url');

module.exports = 
class ContactsController extends require('./Controller') {
    constructor(req, res){
        super(req, res);
        this.bookmarkRepository = new Repository('Bookmarks');
    }
    // GET: api/bookmarks
    // GET: api/bookmarks/{id}
    get(id){
        if(!isNaN(id))
            this.response.JSON(this.bookmarkRepository.get(id));
        else
            this.response.JSON(this.bookmarkRepository.getAll());
    }
	name(req, res)
	{
		const reqUrl = url.parse(req.url, true)
		let name = reqUrl.query.name;	
		let sliced = name.slice(1,-2);
        this.response.JSON(this.bookmarkRepository.name(sliced));
    }
	category(req, res)
	{
		const reqUrl = url.parse(req.url, true)
		let cat = reqUrl.query.category;
		let cate = cat.slice(1,-2);
        this.response.JSON(this.bookmarkRepository.category(cate));
    }
	sortName(){
		this.response.JSON(this.bookmarkRepository.sortName());
	}
	sortCategory(){
		this.response.JSON(this.bookmarkRepository.sortCategory());
	}
    // POST: api/contacts body payload[{"Id": 0, "Name": "...", "Email": "...", "Phone": "..."}]
    post(contact){  
        // todo : validate contact before insertion
        // todo : avoid duplicates
        if(this.get(contact.id) == null)
        {
            let newContact = this.bookmarkRepository.add(contact);
            if (newContact)
                this.response.created(JnewContact);
            else
                this.response.internalError();
        }      
    }
    // PUT: api/contacts body payload[{"Id":..., "Name": "...", "Email": "...", "Phone": "..."}]
    put(contact){
        // todo : validate contact before updating
        if(this.get(contact.id) == null)
        {
            if (this.bookmarkRepository.update(contact))
                this.response.ok();
             else 
                this.response.notFound();
        }       
    }
    // DELETE: api/contacts/{id}
    remove(id){
        if (this.bookmarkRepository.remove(id))
            this.response.accepted();
        else
            this.response.notFound();
    }
}