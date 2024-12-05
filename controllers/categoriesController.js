const Categories = require('../models/Categories')

module.exports = {
    createCategories: async (req, res) => {
        const newCategories = new Categories(req.body)
        
        try{
            await newCategories.save()

            return res.status(201).json({ status: true, message: 'Category saved successfully' })
        }catch(err){
            return res.status(500).json({ status: false, message: 'Erro saving category' })

        }
    },

    updateCategories: async ( req, res ) => {
        const id = req.params.id
        const { title, value, imageUrl } = req.body
        
        try{
            const updatedCategories = await Categories.findByIdAndUpdate(id,
                {
                    title: title,
                    value: value,
                    imageUrl: imageUrl
                },
                {new: true}
            )

            if(!updatedCategories){
                return res.status(404).json({ status: false, message: 'Category not found' })
            }

            return res.status(200).json({ status: true, message: 'Category updated successfully' })
        }catch(err){
            return res.status(500).json({ status: false, message: 'Error updating category' })
        }
    },

    deleteCategories: async ( req, res ) => {
        const id = req.params.id

        try{
            const categories = await Categories.findById(id)

            if(!categories){
                return res.status(404).json({ status: false, message: 'Category not found' })
            }

            await Categories.findByIdAndDelete(id)

            return res.status(200).json({ status: true, message: 'Category deleted successfully' })
        }catch(err){
            return res.status(500).json({ status: false, message: err.message })
        }
    },

    getAllCategories: async ( req, res ) => {
        try{
            const categories = await Categories.find({}, {__v: 0, updatedAt: 0, createdAt: 0})

            return res.status(200).json({ status: true, categories })
        }catch(err){
            return res.status(500).json({ status: false, message: err.message })
        }
    },

    patchCategoriesImage: async ( req, res ) => {
        const id = req.params.id
        const imageUrl = req.body

        try{
            const existingCategory = await Categories.fingById(id)

            const updatedCategories = new Categories({
                title: existingCategory.title,
                value: existingCategory.value,
                imageUrl: imageUrl
            })

            await updatedCategories.save()

            return res.status(200).json({ status: true, message: 'Category image updated successfully' })
        }catch(err){
            return res.status(500).json({ status: false, message: 'Erro updating category image' })
        }
    },

    getRandomCategories: async ( req, res ) => {
        try{
            let categories = await Categories.aggregate([
                {$match : { value: {$ne: 'more'}}},
                {$sample: { size: 7}}
            ], {__v: 0, updatedAt: 0, createdAt: 0})

            const moreCategory = await Categories.findOne({ value: 'more'}, {__v: 0, updatedAt: 0, createdAt: 0})

            if(moreCategory){
                categories.push(moreCategory)
            }

            return res.status(200).json({ status: true, categories })
        }catch(err){
            return res.status(500).json({ status: false, message: err.message })
        }
    }
}