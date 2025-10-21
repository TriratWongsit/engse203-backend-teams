// controllers/agentController.js - Business logic ที่แยกจาก routes
const { Agent, agents } = require('../models/Agent');
const { AGENT_STATUS, VALID_STATUS_TRANSITIONS, API_MESSAGES } = require('../utils/constants');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const agentController = {
  // ✅ ให้ code สำเร็จเป็นตัวอย่าง
  // GET /api/agents/:id
  getAgentById: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      console.log(`📋 Retrieved agent: ${agent.agentCode}`);
      return sendSuccess(res, 'Agent retrieved successfully', agent.toJSON());
    } catch (error) {
      console.error('Error in getAgentById:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // 🔄 TODO #1: นักศึกษาทำเอง (10 นาที)
  // Solution hints:
  getAllAgents: (req, res) => {
    try {
      const { status, department } = req.query;
      let agentList = Array.from(agents.values());

      // Filter by status
      if (status) {
        agentList = agentList.filter(agent => agent.status === status);
      }

      // Filter by department  
      if (department) {
        agentList = agentList.filter(agent => agent.department === department);
      }

      console.log(`📋 Retrieved ${agentList.length} agents`);
      return sendSuccess(res, 'Agents retrieved successfully',
        agentList.map(agent => agent.toJSON())
      );
    } catch (error) {
      console.error('Error in getAllAgents:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // 🔄 TODO #2: นักศึกษาทำเอง (15 นาที)  
  // POST /api/agents
  createAgent: (req, res) => {
    try {
      const agentData = req.body;

      // TODO: ตรวจสอบว่า agentCode ซ้ำไหม
      const existingAgent = Array.from(agents.values())
        .find(agent => agent.agentCode === agentData.agentCode);

      if (existingAgent) {
        return sendError(res, `Agent code ${agentData.agentCode} already exists`, 409);
      }
      // TODO: สร้าง Agent ใหม่
      const newAgent = new Agent(agentData);
      // TODO: เก็บลง Map
      agents.set(newAgent.id, newAgent);

      // TODO: ส่ง response พร้อม status 201
      return sendSuccess(res, API_MESSAGES.AGENT_CREATED, newAgent.toJSON(), 201);

      return sendError(res, 'TODO: Implement createAgent function', 501);
    } catch (error) {
      console.error('Error in createAgent:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // ✅ ให้ code สำเร็จเป็นตัวอย่าง
  // PUT /api/agents/:id
  updateAgent: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      const { name, email, department, skills } = req.body;

      // Update allowed fields
      if (name) agent.name = name;
      if (email) agent.email = email;
      if (department) agent.department = department;
      if (skills) agent.skills = skills;

      agent.updatedAt = new Date();

      console.log(`✏️ Updated agent: ${agent.agentCode}`);
      return sendSuccess(res, API_MESSAGES.AGENT_UPDATED, agent.toJSON());
    } catch (error) {
      console.error('Error in updateAgent:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // 🔄 TODO #3: นักศึกษาทำเอง (15 นาที - ยากสุด)
  // PATCH /api/agents/:id/status  
  updateAgentStatus: (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      // TODO: หา agent จาก id
      const agent = agents.get(id);

      // TODO: ตรวจสอบว่า agent มีอยู่ไหม
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }
      // TODO: validate status ด้วย AGENT_STATUS 
      if (!Object.values(AGENT_STATUS).includes(status)) {
        return sendError(res, `Invalid status. Valid: ${Object.values(AGENT_STATUS).join(', ')}`, 400);
      }
      // TODO: ตรวจสอบ valid transition ด้วย VALID_STATUS_TRANSITIONS
      const currentStatus = agent.status;
      const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];
      // TODO: เรียก agent.updateStatus(status, reason)
      if (!validTransitions.includes(status)) {
        // TODO: ส่ง response กลับ
        return sendError(res,
          `Cannot change from ${currentStatus} to ${status}. Valid: ${validTransitions.join(', ')}`,
          400
        );
      }

      //Issue 2: TODO Functions Return 501 Error
      return sendSuccess(res, 'Success message', data);
    } catch (error) {
      console.error('Error in updateAgentStatus:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // ✅ ให้ code สำเร็จ
  // DELETE /api/agents/:id
  deleteAgent: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      agents.delete(id);

      console.log(`🗑️ Deleted agent: ${agent.agentCode} - ${agent.name}`);
      return sendSuccess(res, API_MESSAGES.AGENT_DELETED);
    } catch (error) {
      console.error('Error in deleteAgent:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // ✅ ให้ code สำเร็จ - Dashboard API
  // GET /api/agents/status/summary
  getStatusSummary: (req, res) => {
    try {
      const agentList = Array.from(agents.values());
      const totalAgents = agentList.length;

      const statusCounts = {};
      Object.values(AGENT_STATUS).forEach(status => {
        statusCounts[status] = agentList.filter(agent => agent.status === status).length;
      });

      const statusPercentages = {};
      Object.entries(statusCounts).forEach(([status, count]) => {
        statusPercentages[status] = totalAgents > 0 ? Math.round((count / totalAgents) * 100) : 0;
      });

      const summary = {
        totalAgents,
        statusCounts,
        statusPercentages,
        lastUpdated: new Date().toISOString()
      };

      return sendSuccess(res, 'Status summary retrieved successfully', summary);
    } catch (error) {
      console.error('Error in getStatusSummary:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },


  // Agent Search API
  searchAgents: (req, res) => {
    console.log('🔍 [searchAgents] called with query:', req.query);

    const { q = '', fields = '' } = req.query;
    const keyword = q.toLowerCase();
    const selectedFields = fields.split(',').map(f => f.trim()).filter(f => f);

    const results = Array.from(agents.values()).filter(agent => {
      return [agent.name, agent.email, agent.agentCode].some(field =>
        field.toLowerCase().includes(keyword)
      );
    });

    const response = results.map(agent => {
      const data = agent.toJSON();
      if (selectedFields.length === 0) return data;

      // คืนเฉพาะ field ที่เลือก
      return Object.fromEntries(
        selectedFields.map(f => [f, data[f]]).filter(([key, val]) => val !== undefined)
      );
    });

    console.log(`✅ [searchAgents] found ${response.length} result(s)`);
    res.json({ success: true, total: response.length, results: response });
  },



  //Department Statistics
  getDepartmentStatistics: (req, res) => {
    try {
      const summary = {};
      const agentList = Array.from(agents.values());

      agentList.forEach(agent => {
        const dept = agent.department || 'Unknown';
        const status = agent.status || 'Unknown';

        if (!summary[dept]) {
          summary[dept] = { total: 0 };
        }

        summary[dept].total += 1;
        summary[dept][status] = (summary[dept][status] || 0) + 1;
      });

      return sendSuccess(res, 'Department statistics retrieved successfully', {
        summary,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in getDepartmentStatistics:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  //Status History
  getStatusHistory: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      return sendSuccess(res, 'Status history retrieved successfully', agent.getStatusHistory());
    } catch (error) {
      console.error('Error in getStatusHistory:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  }

};

module.exports = agentController;