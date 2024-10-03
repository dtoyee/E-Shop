function ProductCard({ product }) {
    return (
        product.map(prod => {
            return (
                <div class="card" style={{width: 18+'rem', display: 'inline-block', marginLeft: 25+'px', marginBottom: 10+'px'}}>
                    <img src={prod.images} class="card-img-top" alt="..." height={200} />
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href={"/"+prod.id+"/"+prod.title.replaceAll(" ","-")}>{ prod.title }</a>
                        </h5>
                        <a href="#" class="btn btn-success">Add To Basket</a>
                    </div>
                </div>
            )
        })
    )
}

export default ProductCard