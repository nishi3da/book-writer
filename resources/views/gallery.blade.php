<div>
    <!-- An unexamined life is not worth living. - Socrates -->
    @foreach ($gallery_list as $gallery)
        <div>
            <img src="/gallery/preview/{{ $gallery->id }}" style="max-width:120px;" />
            <h5>{{ $gallery->id }}</h5>
        </div>
    @endforeach
</div>

<form method="post" enctype="multipart/form-data">
    @csrf
    <input type="file" name="image" accept="image/*" />
    <input type="submit" value="upload" />
</form>

<script>
    const gallery = @json($gallery_list)
    console.log(gallery);
    //init_hogehoge(gallery);
</script>
