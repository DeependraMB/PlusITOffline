const District = require('../Models/DistrictModel');
const Constituency = require('../Models/Constituency');
const Assembly = require('../Models/Assembly');


exports.postAddDistrict = async(req, res) =>{
    const { name } = req.body;
    try {
      const district = new District({ name });
      await district.save();
      res.status(201).json(district);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

exports.postAddConstituency = async(req, res) => {
    const { name, districtId } = req.body;
    try {
      const district = await District.findById(districtId);
      if (!district) throw new Error('District not found');
      const constituency = new Constituency({ name, district });
      await constituency.save();
      district.constituencies.push(constituency);
      await district.save();
      res.status(201).json(constituency);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

exports.postAddAssembly = async(req, res) =>{
    const { name, constituencyId } = req.body;
    try {
      const constituency = await Constituency.findById(constituencyId);
      if (!constituency) throw new Error('Constituency not found');
      const assembly = new Assembly({ name, constituency });
      constituency.assemblies.push(assembly);
      await constituency.save();
      await assembly.save();
      res.status(201).json(assembly);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}