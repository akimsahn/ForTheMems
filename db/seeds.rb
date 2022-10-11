puts 'Seeding data...'

u1 = User.create(username: "harrypotter", password: 'test')
u2 = User.create(username: "ronweasley", password: 'test')

f1 = Friend.create(full_name: 'Cedric', birthday: '13/02/1992', user: u1, image_url: 'https://i.scdn.co/image/ab67706c0000bebbe5f93ed4e7ab5d7b153405ee')
f2 = Friend.create(full_name: 'Ron', birthday: '4/4/1994', user: u1, image_url: 'https://s2.r29static.com/bin/entry/40a/0,46,460,460/1200x1200,80/1462467/image.jpg')
f3 = Friend.create(full_name: 'Hermione', birthday: '23/09/1994', user: u1, image_url: 'https://myhero.com/images/guest/g282317/hero105677/image2.jpg')
f4 = Friend.create(full_name: 'Hagrid', birthday: '21/06/1982', user: u1, image_url: 'https://the-wizards-shop.com/2419-thickbox_default/pop-n126-hagrid-holiday-christmas-tree.jpg')
f5 = Friend.create(full_name: 'Draco', birthday: '7/7/1994', user: u1, image_url: 'https://i.pinimg.com/736x/e2/b0/e7/e2b0e70f3627ce10d9faa701c9612148.jpg')
f6 = Friend.create(full_name: 'Hermione', birthday: '23/09/1994', user: u2, image_url: 'https://myhero.com/images/guest/g282317/hero105677/image2.jpg')
f7 = Friend.create(full_name: 'Hagrid', birthday: '21/06/1982', user: u2, image_url: 'https://the-wizards-shop.com/2419-thickbox_default/pop-n126-hagrid-holiday-christmas-tree.jpg')


m1 = Memory.create(date: '10/10/2010', comment: 'The End', created_user_id: u1.id, image_url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F10%2Fhp72-fp-00658-2000.jpg')
m2 = Memory.create(date: '31/08/2004', comment: 'The Beginning', created_user_id: u1.id, image_url: 'https://i.insider.com/5f208f02a6f0e102c1356b59?width=600&format=jpeg&auto=webp')
m3 = Memory.create(date: '22/01/2005', comment: 'Me and my best friend', created_user_id: u1.id, image_url: 'https://assets.teenvogue.com/photos/593965c4a659e13c77f0ddc8/master/w_2400,h_1593,c_limit/MSDHAPO_EC010_H.JPG')
m4 = Memory.create(date: '22/12/2004', comment: '"Not me, not Hermione, YOU."', created_user_id: u1.id, image_url: 'https://img.wattpad.com/01ab96411e75ea9d6320bdfd6de654757169d604/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5941667034486b6c4851337263513d3d2d313033313433393631382e3136366432393265616439626230653631373738313739313035362e676966')
FriendMemory.create(user: u1, memory: m1, friend: f2)
FriendMemory.create(user: u1, memory: m1, friend: f3)
FriendMemory.create(user: u1, memory: m3, friend: f5)
FriendMemory.create(user: u1, memory: m4, friend: f2)
FriendMemory.create(user: u1, memory: m2)

puts 'Done seeding!'