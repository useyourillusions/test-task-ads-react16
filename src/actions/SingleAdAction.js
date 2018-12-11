const singleAdLoaded = object => ({
    type: 'SINGLE-AD_LOADED',
    payload: object
});

const singleAdLoading = bool => ({
    type: 'SINGLE-AD_LOADING',
    payload: bool
});

const getSingleAd = id => {
    return dispatch => {
        dispatch(singleAdLoading(true));

        setTimeout(() => {
            const obj = {
                title: 'Default title ' + id,
                img: 'https://dummyimage.com/600x400/000/00ffd5.png',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequatur esse ipsa iste iusto! Adipisci atque aut blanditiis culpa dolore dolores earum et eum eveniet ex hic illum ipsam laborum minus nobis, non odio, officia officiis placeat quaerat qui quia, ratione sapiente sed sunt unde voluptates? A architecto autem cum ex fuga id, magnam quos repellat similique velit! Adipisci aliquid aut distinctio doloribus id illum minus quibusdam tenetur voluptate voluptates! Architecto at harum ipsam obcaecati quas quos temporibus unde? Aperiam aspernatur assumenda eaque earum minima officia, quisquam recusandae sequi ullam? Ab accusamus ad aliquid animi at, atque beatae cum cumque dolore et incidunt iste laboriosam modi molestiae nam natus nesciunt omnis perferendis porro quaerat quam quidem quo ratione recusandae sint totam vitae! Delectus sint, voluptate!'
            };

            dispatch(singleAdLoaded(obj));
        }, 1500);
    }
};

export { singleAdLoaded, singleAdLoading, getSingleAd };
