import React from 'react'
import { Label, TextInput ,Button} from 'flowbite-react';


function AdminProfile() {
  return (
    <div class="p-4 sm:ml-64">
    <div class="p-4  mt-14">
    <div class= "flex items-center justify-center mb-4 rounded  ">
    <form className=" flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small" value="Small input" />
        </div>
        <TextInput id="small" type="text" sizing="sm" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Base input" />
        </div>
        <TextInput id="base" type="text" sizing="md" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="large" value="Large input" />
        </div>
        <TextInput id="large" type="text" sizing="lg" />
      </div>
      <Button type="submit">Simpan</Button>
    </form>
    </div>
    </div>
    </div>
  )
}

export default AdminProfile